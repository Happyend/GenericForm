import React from 'react';
import PropTypes from 'prop-types';
import {hasValue, regexMatches, isRadioOrCheckbox} from './helpers';
import GenericFormFieldLabel from './GenericFormFieldLabel';
import {GenericFormFieldTypes, GenericFormFieldDataTypes} from './types';

const _genericForms = {};
const _extraTypes = {};
let _requiredLabelSuffix = '';

class GenericFormField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isFocused: false,
      // GenericFormField is always controlled by default if no value or defaultValue is set we use
      // an empty string, however you may override this behaviour with the defaultEmptyValue prop
      value: props.defaultValue || props.value || (props.hasOwnProperty('defaultEmptyValue') ? props.defaultEmptyValue : ''),
      showError: isRadioOrCheckbox(this.props), //force showError if radio or checkbox for firefox/safari onBlur
      showGroupError: false,
      identicalGroupError: false,
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
    if (!_genericForms[this.props.formId]) _genericForms[this.props.formId] = {};

    if (this.props.type !== GenericFormFieldTypes.SUBMIT)
      GenericFormField.registerField(this.props.formId, this);

    if (this.props.disableUntilValid && this.props.formId) {
      if (!_genericForms[this.props.formId].disableUntilValid) _genericForms[this.props.formId].disableUntilValid = [];
      _genericForms[this.props.formId].disableUntilValid.push(this);
      this.setFormIsValid(this.validateFields(true))
    }

    this.handleDisabledUntilValid();

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
    this.handleDisabledUntilValid();
  }

  getClassName() {
    let className = `generic-form-field is-${this.props.type} `;
    if (this.props.className) className += `${this.props.className} `;
    if (this.state.isFocused) className += 'is-focused ';
    if (this.state.checked) className += 'is-checked ';
    if (typeof this.state.value !== 'undefined' && this.state.value !== '') className += 'has-value ';
    if (typeof this.props.disabled) className += 'is-disabled ';
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

    if (this.props.error || this.state.error || this.state.showGroupError || this.state.identicalGroupError)
      className += 'has-error ';

    return className;
  }

  render() {

    if (this.props.type === GenericFormFieldTypes.HIDDEN)
      return this.renderGenericFormField(this.props);

    return <div className={this.getClassName()}>
      <GenericFormFieldLabel
        {...this.props}
        requiredSuffix={this.props.requiredLabelSuffix || _requiredLabelSuffix}
        value={this.state.value}
      />
      {this.renderGenericFormField()}
      {this.renderError()}
      {this.props.after}
    </div>;
  }

  renderRequiredSuffix(validation, requiredSuffix) {
    return validation && validation.mandatory ? requiredSuffix : '';
  }

  renderGenericFormField() {

    // destructure all non native props to avoid passing them with the rest operator
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
      disableUntilValid,
      disabled,
      requiredLabelSuffix,
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
          ? GenericFormField.getErrorFieldId(this.props.id) + (this.props['aria-describedby'] ? ' ' + this.props['aria-describedby'] : '')
          : this.props['aria-describedby'],
      ref: this.el,
      disabled: disabled || (disableUntilValid && !this.state.formIsValid || false)
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
            <option value="">
              {label}{this.renderRequiredSuffix(validation, requiredLabelSuffix || _requiredLabelSuffix)}
            </option>
            : null}
          {
            options.map(({label, value, isPlaceholder}, i) =>
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
      return <div {...adaAttributes} className="generic-form-error">
        {this.props.error || this.state.error}
      </div>;
    if (this.state.showGroupError && this.props.validation.errorGroup)
      return <div {...adaAttributes} className="generic-form-error">
        {this.props.validation.errorGroup}
      </div>;
    if (this.state.identicalGroupError && this.props.validation.errorIdenticalGroup)
      return <div {...adaAttributes} className="generic-form-error">
        {this.props.validation.errorIdenticalGroup}
      </div>;
    return null;
  }

  onChange(e) {
    const stateUpdate = {};
    if (isRadioOrCheckbox(this.props)) {
      stateUpdate.checked = !this.state.checked;
      if (this.props.type === GenericFormFieldTypes.RADIO) this.setOtherRadiosChecked(!stateUpdate.checked);
    } else {
      if (_extraTypes[this.props.type] && _extraTypes[this.props.type].onChangeGetValue)
        stateUpdate.value = _extraTypes[this.props.type].onChangeGetValue(e);
      else
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
        if (this.state.identicalGroupError) {
          this.validateIdenticalGroups();
        }

        this.handleDisabledUntilValid();
      }
    );
    if (typeof this.props.onChange === 'function') this.props.onChange(e, this.getValue());
  }

  setOtherRadiosChecked(checked) {
    GenericFormField.getFields(this.props.formId)
      .filter(({props: {type, name}}) => type === GenericFormFieldTypes.RADIO && name === this.props.name)
      .forEach(
        f => f.setState({checked})
      );
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

    this.validateIdenticalGroups();
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

      if (this.props.validation.customErrorHandlers) {
        for (let key in this.props.validation.customErrorHandlers) {
          if (this.props.validation.customErrorHandlers[key](value)) {
            return key;
          }
        }
      }

    }
    return false;
  }

  validateIdenticalGroups() {
    if (this.props.validation && this.props.validation.identicalGroup) {
      const fields = GenericFormField.getFields(this.props.formId).filter(({props}) =>
        props.validation && props.validation.identicalGroup && props.validation.identicalGroup === this.props.validation.identicalGroup);
      const value = this.getValue();
      for (let i = 0, length = fields.length; i < length; i++) {
        if (fields[i].getValue() !== value) {
          this.setIdenticalGroupError(true);
          fields[i].setIdenticalGroupError(true);
          return false;
        }
      }
      fields.forEach(f => f.setIdenticalGroupError(false));
    }
    return true;
  }

  validate(silent) {
    if (this.props.validation) {
      const error = this.getError();
      if (!silent) {
        this.setState({
          error,
          showError: true
        });
      }
      if (error)
        return false;
    } else if (!silent) {
      this.setState({
        showError: true
      });
    }
    return true;
  }

  validateFields(silent) {

    const fields = GenericFormField.getFields(this.props.formId);
    let isValid = true;

    for (let i = 0, iLength = fields.length; i < iLength; i++) {
      let f = fields[i];
      if (f.props.validation) {
        let validField = f.validate(silent);
        if (!validField) isValid = false;
      }
    }

    if (fields[0] && !fields[0].validateGroups(silent)) isValid = false;

    return isValid;

  }

  handleDisabledUntilValid() {

    if (_genericForms[this.props.formId] && _genericForms[this.props.formId].disableUntilValid &&
      _genericForms[this.props.formId].disableUntilValid.length) {
      const isValid = this.validateFields(true);

      _genericForms[this.props.formId].disableUntilValid.forEach(
        f => f.setFormIsValid(isValid)
      );
    }

  }

  setFormIsValid(formIsValid) {

    this.setState({
      formIsValid
    });
  }

  showGroupError(show) {
    this.setState({
      showGroupError: typeof show === 'undefined' ? true : show
    });
  }

  validateGroups(silent) {

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
        if (!silent) {
          groups[key].forEach(groupField => {
            groupField[0].showGroupError(true);
          });
        }
        isValid = false;
      } else {
        if (!silent) {
          groups[key].forEach(groupField => {
            groupField[0].showGroupError(false);
          });
        }
      }
    }

    return isValid;
  }

  setIdenticalGroupError(identicalGroupError) {
    this.setState({
      identicalGroupError
    });
  }

  reset() {
    const state = {
      showError: false,
      error: false,
      showGroupError: false,
      identicalGroupError: false
    };
    if (isRadioOrCheckbox(this.props)) state.checked = this.props.checked || false;
    else state.value = this.props.defaultValue || (this.props.hasOwnProperty('defaultEmptyValue') ? this.props.defaultEmptyValue : '');

    this.setState(state)
  }

  static getErrorFieldId(id) {
    return `${id}-error`;
  }

  static registerField(formId, field) {
    _genericForms[formId].fields = [..._genericForms[formId].fields || [], field];
  }

  static unregisterField(formId, field) {
    const fields = [..._genericForms[formId].fields];
    fields.splice(_genericForms[formId].fields.indexOf(field), 1);
    _genericForms[formId].fields = fields;
  }

  static getFields(formId) {
    return _genericForms[formId] && _genericForms[formId].fields || [];
  }

  static registerExtraType(type, options) {
    if (!_extraTypes[type])
      _extraTypes[type] = options;
  }

  static setRequiredLabelSuffix(suffix) {
    _requiredLabelSuffix = suffix;
  }

}

const validationShape = {
  mandatory: PropTypes.bool,
  negativeRegex: PropTypes.object,
  positiveRegex: PropTypes.object,
  errorEmpty: PropTypes.string,
  group: PropTypes.string,
  groupMin: PropTypes.number,
  errorGroup: PropTypes.string
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
  defaultEmptyValue: PropTypes.any,
  labelAsDefault: PropTypes.bool,
  after: PropTypes.node,
  disableUntilValid: PropTypes.bool,
  requiredLabelSuffix: PropTypes.string,
};

GenericFormFieldLabel.propTypes = GenericFormFieldShape;
GenericFormField.propTypes = GenericFormFieldShape;


export default GenericFormField;
