(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global.GenericForm = {}, global.React, global.PropTypes));
}(this, function (exports, React, PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var GenericFormFieldTypes = {
    CHECKBOX: 'checkbox',
    EMAIL: 'email',
    HIDDEN: 'hidden',
    NUMBER: 'number',
    PASSWORD: 'password',
    RADIO: 'radio',
    SELECT: 'select',
    SUBMIT: 'submit',
    TEL: 'tel',
    TEXT: 'text',
    TEXTAREA: 'textarea'
  };
  var GenericFormFieldDataTypes = {
    BOOL: 'bool',
    NUMBER: 'number'
  };

  var hasValue = function hasValue(val) {
    return !!val;
  };
  var regexMatches = function regexMatches(val, regex) {
    return (regex instanceof RegExp ? regex : new RegExp(regex)).test(val);
  };
  var isRadioOrCheckbox = function isRadioOrCheckbox(_ref) {
    var type = _ref.type;
    return type === GenericFormFieldTypes.CHECKBOX || type === GenericFormFieldTypes.RADIO;
  };

  var GenericFormFieldLabel = function GenericFormFieldLabel(_ref) {
    var id = _ref.id,
        label = _ref.label,
        type = _ref.type,
        labelAsDefault = _ref.labelAsDefault,
        value = _ref.value,
        requiredSuffix = _ref.requiredSuffix,
        validation = _ref.validation;
    return label && (type !== GenericFormFieldTypes.SELECT || !labelAsDefault || value) ? React.createElement("label", {
      htmlFor: id
    }, label, validation && validation.mandatory && React.createElement("span", {
      className: "required-text"
    }, requiredSuffix)) : null;
  };

  var _genericForms = {};
  var _extraTypes = {};
  var _requiredLabelSuffix = '';

  var GenericFormField =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GenericFormField, _React$Component);

    function GenericFormField(props) {
      var _this;

      _classCallCheck(this, GenericFormField);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GenericFormField).call(this, props));
      _this.state = {
        error: false,
        isFocused: false,
        // GenericFormField is always controlled by default if no value or defaultValue is set we use
        // an empty string, however you may override this behaviour with the defaultEmptyValue prop
        value: props.defaultValue || props.value || (props.hasOwnProperty('defaultEmptyValue') ? props.defaultEmptyValue : ''),
        showError: isRadioOrCheckbox(_this.props),
        //force showError if radio or checkbox for firefox/safari onBlur
        showGroupError: false,
        identicalGroupError: false
      };
      if (isRadioOrCheckbox(_this.props)) _this.state.checked = _this.props.checked || false;
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
      _this.getValue = _this.getValue.bind(_assertThisInitialized(_this));
      _this.el = React.createRef();
      return _this;
    }

    _createClass(GenericFormField, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!_genericForms[this.props.formId]) _genericForms[this.props.formId] = {};
        if (this.props.type !== GenericFormFieldTypes.SUBMIT) GenericFormField.registerField(this.props.formId, this);

        if (this.props.disableUntilValid && this.props.formId) {
          if (!_genericForms[this.props.formId].disableUntilValid) _genericForms[this.props.formId].disableUntilValid = [];

          _genericForms[this.props.formId].disableUntilValid.push(this);

          this.setFormIsValid(this.validateFields(true));
        }

        this.handleDisabledUntilValid();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var stateUpdate = {};
        if (this.props.value !== prevProps.value) stateUpdate.value = this.props.value;
        if (this.props.checked !== prevProps.checked) stateUpdate.checked = this.props.checked;
        if (Object.keys(stateUpdate).length) this.setState(stateUpdate);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.type !== GenericFormFieldTypes.SUBMIT) GenericFormField.unregisterField(this.props.formId, this);
        this.handleDisabledUntilValid();
      }
    }, {
      key: "getClassName",
      value: function getClassName() {
        var className = "generic-form-field is-".concat(this.props.type, " ");
        if (this.props.className) className += "".concat(this.props.className, " ");
        if (this.state.isFocused) className += 'is-focused ';
        if (this.state.checked) className += 'is-checked ';
        if (typeof this.state.value !== 'undefined' && this.state.value !== '') className += 'has-value ';

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

        if (this.props["break"]) className += 'break ';
        if (this.props.error || this.state.error || this.state.showGroupError || this.state.identicalGroupError) className += 'has-error ';
        return className;
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.type === GenericFormFieldTypes.HIDDEN) return this.renderGenericFormField(this.props);
        return React.createElement("div", {
          className: this.getClassName()
        }, React.createElement(GenericFormFieldLabel, _extends({}, this.props, {
          requiredSuffix: this.props.requiredLabelSuffix || _requiredLabelSuffix,
          value: this.state.value
        })), this.renderGenericFormField(), this.renderError(), this.props.after);
      }
    }, {
      key: "renderRequiredSuffix",
      value: function renderRequiredSuffix(validation, requiredSuffix) {
        return validation && validation.mandatory ? requiredSuffix : '';
      }
    }, {
      key: "renderGenericFormField",
      value: function renderGenericFormField() {
        // destructure all non native props to avoid passing them with the rest operator
        var _this$props = this.props,
            dataType = _this$props.dataType,
            label = _this$props.label,
            labelAsDefault = _this$props.labelAsDefault,
            options = _this$props.options,
            className = _this$props.className,
            error = _this$props.error,
            value = _this$props.value,
            defaultValue = _this$props.defaultValue,
            checked = _this$props.checked,
            type = _this$props.type,
            after = _this$props.after,
            validation = _this$props.validation,
            formId = _this$props.formId,
            fieldType = _this$props.fieldType,
            disableUntilValid = _this$props.disableUntilValid,
            disabled = _this$props.disabled,
            requiredLabelSuffix = _this$props.requiredLabelSuffix,
            nativeProps = _objectWithoutProperties(_this$props, ["dataType", "label", "labelAsDefault", "options", "className", "error", "value", "defaultValue", "checked", "type", "after", "validation", "formId", "fieldType", "disableUntilValid", "disabled", "requiredLabelSuffix"]);

        var props = _objectSpread2({}, nativeProps, {
          value: this.state.value,
          onChange: this.onChange,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          'aria-invalid': !!this.state.error,
          'aria-required': validation && validation.mandatory,
          'aria-describedby': !!this.state.error ? GenericFormField.getErrorFieldId(this.props.id) + (this.props['aria-describedby'] ? ' ' + this.props['aria-describedby'] : '') : this.props['aria-describedby'],
          ref: this.el,
          disabled: disabled || disableUntilValid && !this.state.formIsValid || false
        });

        if (_extraTypes[type]) {
          return _extraTypes[type].render(props, this.props, this.state);
        }

        switch (type) {
          case GenericFormFieldTypes.CHECKBOX:
          case GenericFormFieldTypes.RADIO:
            return React.createElement("input", _extends({}, props, {
              type: type,
              checked: this.state.checked
            }));

          case GenericFormFieldTypes.SELECT:
            return React.createElement("select", props, labelAsDefault ? React.createElement("option", {
              value: ""
            }, label, this.renderRequiredSuffix(validation, requiredLabelSuffix || _requiredLabelSuffix)) : null, options.map(function (_ref, i) {
              var label = _ref.label,
                  value = _ref.value,
                  isPlaceholder = _ref.isPlaceholder;
              return React.createElement("option", {
                key: i,
                value: value,
                disabled: isPlaceholder,
                selected: isPlaceholder,
                hidden: isPlaceholder
              }, label);
            }));

          case GenericFormFieldTypes.TEXTAREA:
            return React.createElement("textarea", props);

          case GenericFormFieldTypes.NUMBER:
          case GenericFormFieldTypes.TEL:
          case GenericFormFieldTypes.TEXT:
          case GenericFormFieldTypes.SUBMIT:
          default:
            return React.createElement("input", _extends({}, props, {
              type: type
            }));
        }
      }
    }, {
      key: "renderError",
      value: function renderError() {
        var adaAttributes = {
          'aria-live': 'polite',
          'aria-relevant': 'text',
          id: GenericFormField.getErrorFieldId(this.props.id)
        };
        if (this.props.error || this.state.error) return React.createElement("div", _extends({}, adaAttributes, {
          className: "generic-form-error"
        }), this.props.error || this.state.error);
        if (this.state.showGroupError && this.props.validation.errorGroup) return React.createElement("div", _extends({}, adaAttributes, {
          className: "generic-form-error"
        }), this.props.validation.errorGroup);
        if (this.state.identicalGroupError && this.props.validation.errorIdenticalGroup) return React.createElement("div", _extends({}, adaAttributes, {
          className: "generic-form-error"
        }), this.props.validation.errorIdenticalGroup);
        return null;
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        var _this2 = this;

        var stateUpdate = {};

        if (isRadioOrCheckbox(this.props)) {
          stateUpdate.checked = !this.state.checked;
          if (this.props.type === GenericFormFieldTypes.RADIO) this.setOtherRadiosChecked(!stateUpdate.checked);
        } else {
          if (_extraTypes[this.props.type] && _extraTypes[this.props.type].onChangeGetValue) stateUpdate.value = _extraTypes[this.props.type].onChangeGetValue(e);else stateUpdate.value = this.getValue();
          if (this.props.maxLength) stateUpdate.value = stateUpdate.value.substr(0, this.props.maxLength);
        }

        this.setState(stateUpdate, function () {
          if (_this2.state.showError) _this2.validate();

          if (_this2.state.showGroupError) {
            _this2.validateGroups();
          }

          if (_this2.state.identicalGroupError) {
            _this2.validateIdenticalGroups();
          }

          _this2.handleDisabledUntilValid();
        });
        if (typeof this.props.onChange === 'function') this.props.onChange(e, this.getValue());
      }
    }, {
      key: "setOtherRadiosChecked",
      value: function setOtherRadiosChecked(checked) {
        var _this3 = this;

        GenericFormField.getFields(this.props.formId).filter(function (_ref2) {
          var _ref2$props = _ref2.props,
              type = _ref2$props.type,
              name = _ref2$props.name;
          return type === GenericFormFieldTypes.RADIO && name === _this3.props.name;
        }).forEach(function (f) {
          return f.setState({
            checked: checked
          });
        });
      }
    }, {
      key: "onFocus",
      value: function onFocus(e) {
        this.setState({
          isFocused: true
        });
        if (typeof this.props.onFocus === 'function') this.props.onFocus(e);
      }
    }, {
      key: "onBlur",
      value: function onBlur(e) {
        this.setState({
          isFocused: false,
          error: this.getError(),
          showError: true
        });
        this.validateIdenticalGroups();
        if (typeof this.props.onBlur === 'function') this.props.onBlur(e);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var value;

        if (_extraTypes[this.props.type] && _extraTypes[this.props.type].getValue) {
          return _extraTypes[this.props.type].getValue.call(this);
        }

        switch (this.props.type) {
          case GenericFormFieldTypes.RADIO:
          case GenericFormFieldTypes.CHECKBOX:
            value = this.el.current.checked ? this.props.value || true : false;
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
    }, {
      key: "getError",
      value: function getError() {
        if (this.props.validation) {
          var value = this.getValue();

          if (this.props.validation.mandatory) {
            var isEmpty = !hasValue(value);

            if (isEmpty) {
              return this.props.validation.errorEmpty || 'This field is mandatory';
            }
          }

          if (this.props.validation.negativeRegex) {
            for (var key in this.props.validation.negativeRegex) {
              if (!regexMatches(value, this.props.validation.negativeRegex[key])) {
                return key;
              }
            }
          }

          if (this.props.validation.positiveRegex) {
            for (var _key in this.props.validation.positiveRegex) {
              if (regexMatches(value, this.props.validation.positiveRegex[_key])) {
                return _key;
              }
            }
          }

          if (this.props.validation.customErrorHandlers) {
            for (var _key2 in this.props.validation.customErrorHandlers) {
              if (this.props.validation.customErrorHandlers[_key2](value)) {
                return _key2;
              }
            }
          }
        }

        return false;
      }
    }, {
      key: "validateIdenticalGroups",
      value: function validateIdenticalGroups() {
        var _this4 = this;

        if (this.props.validation && this.props.validation.identicalGroup) {
          var fields = GenericFormField.getFields(this.props.formId).filter(function (_ref3) {
            var props = _ref3.props;
            return props.validation && props.validation.identicalGroup && props.validation.identicalGroup === _this4.props.validation.identicalGroup;
          });
          var value = this.getValue();

          for (var i = 0, length = fields.length; i < length; i++) {
            if (fields[i].getValue() !== value) {
              this.setIdenticalGroupError(true);
              fields[i].setIdenticalGroupError(true);
              return false;
            }
          }

          fields.forEach(function (f) {
            return f.setIdenticalGroupError(false);
          });
        }

        return true;
      }
    }, {
      key: "validate",
      value: function validate(silent) {
        if (this.props.validation) {
          var error = this.getError();

          if (!silent) {
            this.setState({
              error: error,
              showError: true
            });
          }

          if (error) return false;
        } else if (!silent) {
          this.setState({
            showError: true
          });
        }

        return true;
      }
    }, {
      key: "validateFields",
      value: function validateFields(silent) {
        var fields = GenericFormField.getFields(this.props.formId);
        var isValid = true;

        for (var i = 0, iLength = fields.length; i < iLength; i++) {
          var f = fields[i];

          if (f.props.validation) {
            var validField = f.validate(silent);
            if (!validField) isValid = false;
          }
        }

        if (fields[0] && !fields[0].validateGroups(silent)) isValid = false;
        return isValid;
      }
    }, {
      key: "handleDisabledUntilValid",
      value: function handleDisabledUntilValid() {
        if (_genericForms[this.props.formId] && _genericForms[this.props.formId].disableUntilValid && _genericForms[this.props.formId].disableUntilValid.length) {
          var isValid = this.validateFields(true);

          _genericForms[this.props.formId].disableUntilValid.forEach(function (f) {
            return f.setFormIsValid(isValid);
          });
        }
      }
    }, {
      key: "setFormIsValid",
      value: function setFormIsValid(formIsValid) {
        this.setState({
          formIsValid: formIsValid
        });
      }
    }, {
      key: "showGroupError",
      value: function showGroupError(show) {
        this.setState({
          showGroupError: typeof show === 'undefined' ? true : show
        });
      }
    }, {
      key: "validateGroups",
      value: function validateGroups(silent) {
        var isValid = true;
        var groups = GenericFormField.getFields(this.props.formId).reduce(function (acc, f) {
          if (f.props.validation && f.props.validation.group) {
            if (!Array.isArray(acc[f.props.validation.group])) acc[f.props.validation.group] = [];
            acc[f.props.validation.group].push([f, f.getValue() && !f.getError()]);
          }

          return acc;
        }, {});

        for (var key in groups) {
          var validFields = groups[key].filter(function (groupField) {
            return groupField[1];
          });

          if (validFields.length < (groups[key][0][0].props.validation.groupMin || 1)) {
            if (!silent) {
              groups[key].forEach(function (groupField) {
                groupField[0].showGroupError(true);
              });
            }

            isValid = false;
          } else {
            if (!silent) {
              groups[key].forEach(function (groupField) {
                groupField[0].showGroupError(false);
              });
            }
          }
        }

        return isValid;
      }
    }, {
      key: "setIdenticalGroupError",
      value: function setIdenticalGroupError(identicalGroupError) {
        this.setState({
          identicalGroupError: identicalGroupError
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        var state = {
          showError: false,
          error: false,
          showGroupError: false,
          identicalGroupError: false
        };
        if (isRadioOrCheckbox(this.props)) state.checked = this.props.checked || false;else state.value = this.props.defaultValue || (this.props.hasOwnProperty('defaultEmptyValue') ? this.props.defaultEmptyValue : '');
        this.setState(state);
      }
    }], [{
      key: "getErrorFieldId",
      value: function getErrorFieldId(id) {
        return "".concat(id, "-error");
      }
    }, {
      key: "registerField",
      value: function registerField(formId, field) {
        _genericForms[formId].fields = [].concat(_toConsumableArray(_genericForms[formId].fields || []), [field]);
      }
    }, {
      key: "unregisterField",
      value: function unregisterField(formId, field) {
        var fields = _toConsumableArray(_genericForms[formId].fields);

        fields.splice(_genericForms[formId].fields.indexOf(field), 1);
        _genericForms[formId].fields = fields;
      }
    }, {
      key: "getFields",
      value: function getFields(formId) {
        return _genericForms[formId] && _genericForms[formId].fields || [];
      }
    }, {
      key: "registerExtraType",
      value: function registerExtraType(type, options) {
        if (!_extraTypes[type]) _extraTypes[type] = options;
      }
    }, {
      key: "setRequiredLabelSuffix",
      value: function setRequiredLabelSuffix(suffix) {
        _requiredLabelSuffix = suffix;
      }
    }]);

    return GenericFormField;
  }(React.Component);

  var validationShape = {
    mandatory: PropTypes.bool,
    negativeRegex: PropTypes.object,
    positiveRegex: PropTypes.object,
    errorEmpty: PropTypes.string,
    group: PropTypes.string,
    groupMin: PropTypes.number,
    errorGroup: PropTypes.string
  };
  var GenericFormFieldShape = {
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
    requiredLabelSuffix: PropTypes.string
  };
  GenericFormFieldLabel.propTypes = GenericFormFieldShape;
  GenericFormField.propTypes = GenericFormFieldShape;

  var GenericForm =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GenericForm, _React$Component);

    function GenericForm(props) {
      var _this;

      _classCallCheck(this, GenericForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GenericForm).call(this, props));
      _this.fields = [];
      _this._onSubmit = _this._onSubmit.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(GenericForm, [{
      key: "render",
      value: function render() {
        return React.createElement("form", {
          id: this.props.id,
          onSubmit: this._onSubmit,
          className: 'generic-form ' + (this.props.className ? this.props.className : '')
        }, this.content(), this.props.children);
      }
    }, {
      key: "content",
      value: function content() {
        var _this2 = this;

        if (!this.props.fields || !this.props.fields.length) return;
        var FieldComponent = this.props.FieldComponent || GenericFormField;
        return this.props.fields.map(function (f, i) {
          return f ? React.createElement(FieldComponent, _extends({
            formId: _this2.props.id,
            key: i
          }, f)) : null;
        });
      }
    }, {
      key: "_onSubmit",
      value: function _onSubmit(e) {
        var fields = GenericFormField.getFields(this.props.id);

        if (fields.length) {
          var isValid = fields[0].validateFields();

          if (!isValid) {
            e.preventDefault();
            return;
          }
        }

        if (typeof this.props.onSubmit === 'function') this.props.onSubmit(e, this.getValues());
      }
    }, {
      key: "getValues",
      value: function getValues() {
        var checkboxes = {};
        var values = GenericFormField.getFields(this.props.id).reduce(function (acc, f) {
          var val = f.getValue();

          if (!isRadioOrCheckbox(f.props)) {
            if (val !== '' && val !== null) acc[f.props.name] = f.getValue();
          } else {
            if (!checkboxes[f.props.name]) {
              checkboxes[f.props.name] = [];
            }

            checkboxes[f.props.name].push(val);
          }

          return acc;
        }, {});

        for (var key in checkboxes) {
          checkboxes[key] = checkboxes[key].filter(function (val) {
            return !!val;
          });
          if (!checkboxes[key].length) checkboxes[key] = false;else if (!key.endsWith('[]') && checkboxes[key].length === 1) {
            checkboxes[key] = checkboxes[key][0];
          }
        }

        for (var _key in checkboxes) {
          if (_key.endsWith('[]')) {
            checkboxes[_key.replace('[]', '')] = checkboxes[_key];
            delete checkboxes[_key];
          }
        }

        return _objectSpread2({}, values, {}, checkboxes);
      }
    }, {
      key: "reset",
      value: function reset() {
        GenericFormField.getFields(this.props.id).forEach(function (f) {
          return f.reset();
        });
      }
    }]);

    return GenericForm;
  }(React.Component);

  GenericForm.propTypes = {
    id: PropTypes.string,
    FieldComponent: PropTypes.elementType,
    onError: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
  };

  var GenericFormFields = function GenericFormFields(_ref) {
    var fields = _ref.fields,
        formId = _ref.formId,
        className = _ref.className;
    return React.createElement("div", {
      className: 'generic-form-fields ' + (className || '')
    }, fields.map(function (f, i) {
      return f ? React.createElement(GenericFormField, _extends({
        formId: formId,
        key: i
      }, f)) : null;
    }));
  };

  exports.GenericFormField = GenericFormField;
  exports.GenericFormFieldDataTypes = GenericFormFieldDataTypes;
  exports.GenericFormFieldTypes = GenericFormFieldTypes;
  exports.GenericFormFields = GenericFormFields;
  exports.default = GenericForm;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
