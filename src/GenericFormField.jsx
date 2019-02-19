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
            error: false,
            isFocused: false,
            value: props.defaultValue || props.value || '',
            showError: isRadioOrCheckbox(this.props), //force showError if radio or checkbox for firefox/safari onBlur
            showGroupError: false,
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

        if (Object.keys(stateUpdate).length) this.setState(stateUpdate);
    }

    componentWillUnmount() {
        if (this.props.type !== GenericFormFieldTypes.SUBMIT)
            GenericFormField.unregisterField(this.props.formId, this);
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

        if (this.props.error || this.state.error || this.state.showGroupError)
            className += 'has-error ';

        return className;
    }

    render() {

        if (this.props.type === GenericFormFieldTypes.HIDDEN)
            return this.renderGenericFormField(this.props);

        return <div className={this.getClassName()}>
            <GenericFormFieldLabel {...this.props} value={this.state.value}/>
            {this.renderGenericFormField()}
            {this.renderError()}
            { this.props.after }
        </div>;
    }

    renderGenericFormField() {

        const {
            dataType,
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
            fieldType,
            ...nativeProps
        } = this.props;

        const props = {
          ...nativeProps,
            value: this.state.value,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            'aria-invalid': !!this.state.error,
            'aria-required': validation && validation.mandatory,
            'aria-describedby':
              !!this.state.error
                ? GenericFormField.getErrorFieldId(this.props.id)
                : null,
            ref: this.el,
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
                        options.map(({ label, value, isPlaceholder }, i) =>
                            <option
                              key={i}
                              value={value}
                              disabled={isPlaceholder}
                              selected={isPlaceholder}
                              hidden={isPlaceholder}
                            >
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

    renderError() {
        const adaAttributes = {
          'aria-live': 'polite',
          'aria-relevant': 'text',
          id: GenericFormField.getErrorFieldId(this.props.id),
        };
        if (this.props.error || this.state.error)
          return <div { ...adaAttributes } className="generic-form-error">
            {this.props.error || this.state.error}
          </div>;
        if (this.state.showGroupError && this.props.validation.errorGroup)
            return <div { ...adaAttributes } className="generic-form-error">
              {this.props.validation.errorGroup}
            </div>;
        return null;
    }

    onChange(e) {
        const stateUpdate = { };
        if (isRadioOrCheckbox(this.props)) {
            stateUpdate.checked = !this.state.checked;
        } else {
            stateUpdate.value = this.getValue();
            if (this.props.maxLength) stateUpdate.value = stateUpdate.value.substr(0, this.props.maxLength);
        }

        this.setState(
            stateUpdate,
            () => {
                if (this.state.showError) this.validate();
                if (this.state.showGroupError) {
                    this.validateGroups();
                }
            }
        );
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
            error: this.getError(),
            showError: true
        });
        if (typeof this.props.onBlur === 'function') this.props.onBlur(e);
    }

    getValue() {
        let value;

        if (_extraTypes[this.props.type] && _extraTypes[this.props.type].getValue) {
            return _extraTypes[this.props.type].getValue.call(this);
        }

        switch (this.props.type) {
            case GenericFormFieldTypes.RADIO:
            case GenericFormFieldTypes.CHECKBOX:
                value = this.el.current.checked
                    ? this.props.value || true
                    : false;
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
                    if (!regexMatches(value, this.props.validation.negativeRegex[key])) {
                        return key;
                    }
                }
            }

            if (this.props.validation.positiveRegex) {
                for (let key in this.props.validation.positiveRegex) {
                    if (regexMatches(value, this.props.validation.positiveRegex[key])) {
                        return key;
                    }
                }
            }

        }
        return false;
    }

    validate() {
        if (this.props.validation) {
            const error = this.getError();
            this.setState({
                error,
                showError: true
            });

            if (error)
                return false;
        } else {
            this.setState({
                showError: true
            });
        }
        return true;
    }

    showGroupError(show) {
        this.setState({
            showGroupError: typeof show === 'undefined' ? true : show
        });
    }

    validateGroups() {

        let isValid = true;
        const groups = GenericFormField.getFields(this.props.formId).reduce((acc, f) => {
            if (f.props.validation && f.props.validation.group) {
                if (!Array.isArray(acc[f.props.validation.group]))
                    acc[f.props.validation.group] = [];
                acc[f.props.validation.group].push([f, f.getValue() && !f.getError()]);
            }
            return acc;
        }, {});

        for (let key in groups) {
            let validFields = groups[key].filter(groupField => groupField[1]);
            if (validFields.length < (groups[key][0][0].props.validation.groupMin || 1)) {
                groups[key].forEach(groupField => {
                    groupField[0].showGroupError(true);
                });
                isValid = false;
            } else {
                groups[key].forEach(groupField => {
                    groupField[0].showGroupError(false);
                });
            }
        }

        return isValid;
    }

    static getErrorFieldId(id){
      return `${id}-error`;
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
    group: PropTypes.string,
    groupMin: PropTypes.number,
    errorGroup: PropTypes.string,
};

export const GenericFormFieldShape = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    label: PropTypes.node,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string,
    dataType: PropTypes.string,
    validation: PropTypes.shape(validationShape),
    value: PropTypes.any,
    labelAsDefault: PropTypes.bool,
    after: PropTypes.node
};

GenericFormFieldLabel.propTypes = GenericFormFieldShape;
GenericFormField.propTypes = GenericFormFieldShape;


export default GenericFormField;
