import React from 'react';
import PropTypes from 'prop-types';
import { hasValue, regexMatches, isRadioOrCheckbox } from './helpers';
import GenericFormFieldLabel from './GenericFormFieldLabel';
import { GenericFormFieldTypes, GenericFormFieldDataTypes } from './types';

const _genericForms = {};
const _extraTypes = {};


class GenericFormField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: this.props.error,
            isFocused: false,
            value: props.defaultValue || props.value || ''
        };

        if (isRadioOrCheckbox(this.props))
            this.state.checked = this.props.checked || false;

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.el = React.createRef();
    }

    componentDidMount() {
        if (this.props.type !== GenericFormFieldTypes.SUBMIT)
            GenericFormField.registerField(this.props.formId, this);
    }

    componentDidUpdate(prevProps) {

        const stateUpdate = {};

        if (this.props.value !== prevProps.value)
            stateUpdate.value = this.props.value;

        if (this.props.checked !== prevProps.checked)
            stateUpdate.checked = this.props.checked;

        if (this.props.error !== prevProps.error)
            stateUpdate.error = this.props.error;

        if (Object.keys(stateUpdate).length) this.setState(stateUpdate);
    }

    componentWillUnmount() {
        if (this.props.type !== GenericFormFieldTypes.SUBMIT)
            GenericFormField.unregisterField(this.props.formId, this);
    }

    setError(message) {
        this.setState({
            error: message
        });
    }

    getClassName() {
        let className = `generic-form-field is-${this.props.type} `;
        if (this.props.className) className += `${this.props.className} `;
        if (this.state.isFocused) className += 'is-focused ';
        if (this.state.checked) className += 'is-checked ';
        if (this.state.value || this.state.value !== '') className += 'has-value ';
        if (this.props.size) {
            switch (this.props.size) {
                case 'half':
                    className += 'size-half ';
                    break;
                case 'full':
                    className += 'size-full ';
                    break;
            }
        }

        if (this.props.break)
            className += 'break ';

        if (this.state.error)
            className += 'has-error ';

        return className;
    }

    render() {

        if (this.props.type === GenericFormFieldTypes.HIDDEN)
            return this.renderGenericFormField(this.props);

        return <div className={this.getClassName()}>
            <GenericFormFieldLabel {...this.props} value={this.state.value}/>
            {this.renderGenericFormField()}
            {this.state.error && <div className="generic-form-error">{this.state.error}</div>}
            { this.props.after }
        </div>;
    }

    renderGenericFormField() {

        const {
            label,
            labelAsDefault,
            options,
            className,
            error,
            value,
            defaultValue,
            checked,
            type,
            after,
            validation,
            formId,
            ...nativeProps
        } = this.props;

        const props = {
            value: this.state.value,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            ref: this.el,
            ...nativeProps
        };

        if (_extraTypes[type]) {
            return _extraTypes[type].render(props, this.props, this.state)
        }

        switch (type) {
            case GenericFormFieldTypes.CHECKBOX:
            case GenericFormFieldTypes.RADIO:
                return <input {...props} type={type} checked={this.state.checked}/>;

            case GenericFormFieldTypes.SELECT:
                return <select {...props}>
                    {labelAsDefault ?
                        <option value="">{label}</option>
                        : null}
                    {
                        options.map(({ label, value }, i) =>
                            <option key={i} value={value}>
                                {label}
                            </option>
                        )
                    }
                </select>;
            case GenericFormFieldTypes.TEXTAREA:
                return <textarea {...props} />;
            case GenericFormFieldTypes.NUMBER:
            case GenericFormFieldTypes.TEL:
            case GenericFormFieldTypes.TEXT:
            case GenericFormFieldTypes.SUBMIT:
            default:
                return <input {...props} type={type}/>;
        }
    }

    onChange(e) {
        const stateUpdate = { };
        if (isRadioOrCheckbox(this.props)) {
            stateUpdate.checked = !this.state.checked;
        } else {
            stateUpdate.value = e.target.value;
        }
        this.setState(stateUpdate, () => this.validate());
        if (typeof this.props.onChange === 'function') this.props.onChange(e, this.getValue());
    }

    onFocus(e) {
        this.setState({
            isFocused: true
        });
        if (typeof this.props.onFocus === 'function') this.props.onFocus(e);
    }

    onBlur(e) {
        this.setState({
            isFocused: false,
            error: this.getError()
        });
        if (typeof this.props.onBlur === 'function') this.props.onBlur(e);
    }

    getValue() {
        let value;

        if (_extraTypes[this.props.type] && _extraTypes[this.props.type].getValue) {
            return _extraTypes[this.props.type].getValue.call(this);
        }

        switch (this.props.type) {
            case GenericFormFieldTypes.DATE:
                value = this.el.current.input.value ? moment(this.el.current.input.value).format('YYYY-MM-DD') : null;
                break;
            case GenericFormFieldTypes.RADIO:
            case GenericFormFieldTypes.CHECKBOX:
                value = this.el.current.checked ? this.el.current.value || true : false;
                break;
            default:
                value = this.el.current.value;
                break;

        }

        switch (this.props.dataType) {
            case GenericFormFieldDataTypes.NUMBER:
                value = parseFloat(value);
                if (isNaN(value)) value = null;
                break;
            case GenericFormFieldDataTypes.BOOL:
                value = !!value;
                break;
        }

        return value;
    }

    getError() {
        if (this.props.validation) {
            const value = this.getValue();
            if (this.props.validation.mandatory) {

                const isEmpty = !hasValue(value);
                if (isEmpty) {
                    return this.props.validation.errorEmpty || 'This field is mandatory';
                }
            }

            if (this.props.validation.negativeRegex) {
                for (let key in this.props.validation.negativeRegex) {
                    if (!regexMatches(value, key)) {
                        return this.props.validation.negativeRegex[key];
                    }
                }
            }

            if (this.props.validation.positiveRegex) {
                for (let key in this.props.validation.positiveRegex) {
                    if (regexMatches(value, key)) {
                        return this.props.validation.positiveRegex[key];
                    }
                }
            }

        }
        return false;
    }

    validate() {
        if (this.props.validation) {
            const error = this.getError();
            if (error) {
                this.setError(error);
                return false;
            }
        }
        return true;
    }


    static registerField(formId, field) {
        if (!_genericForms[formId]) _genericForms[formId] = [];
        _genericForms[formId] = [..._genericForms[formId], field];
    }

    static unregisterField(formId, field) {
        const fields = [..._genericForms[formId]];
        fields.splice(_genericForms[formId].indexOf(field), 1);
        _genericForms[formId] = fields.length ? fields : null;
    }

    static getFields(formId) {
        return _genericForms[formId] || [];
    }

    static registerExtraType(type, options) {
        if (!_extraTypes[type])
            _extraTypes[type] = options;
    }

}


const validationShape = {
    mandatory: PropTypes.bool,
    negativeRegex: PropTypes.object,
    positiveRegex: PropTypes.object,
    errorEmpty: PropTypes.string,
};

export const GenericFormFieldShape = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.node,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.oneOf(
        Object.keys(GenericFormFieldTypes).map(key => GenericFormFieldTypes[key])
    ).ismandatory,
    dataType: PropTypes.oneOf(
        Object.keys(GenericFormFieldDataTypes).map(key => GenericFormFieldDataTypes[key])
    ),
    validation: PropTypes.shape(validationShape),
    value: PropTypes.any,
    labelAsDefault: PropTypes.bool,
    after: PropTypes.node
};

GenericFormFieldLabel.propTypes = GenericFormFieldShape;
GenericFormField.propTypes = GenericFormFieldShape;


export default GenericFormField;
