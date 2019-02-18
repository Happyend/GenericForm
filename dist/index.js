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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
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
        value = _ref.value;
    return label && (type !== GenericFormFieldTypes.SELECT || !labelAsDefault || value) ? React.createElement("label", {
      htmlFor: id
    }, label) : null;
  };

  var _genericForms = {};
  var _extraTypes = {};

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
        value: props.defaultValue || props.value || '',
        showError: isRadioOrCheckbox(_this.props),
        //force showError if radio or checkbox for firefox/safari onBlur
        showGroupError: false
      };
      if (isRadioOrCheckbox(_this.props)) _this.state.checked = _this.props.checked || false;
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getValue = _this.getValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.el = React.createRef();
      return _this;
    }

    _createClass(GenericFormField, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.type !== GenericFormFieldTypes.SUBMIT) GenericFormField.registerField(this.props.formId, this);
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
      }
    }, {
      key: "getClassName",
      value: function getClassName() {
        var className = "generic-form-field is-".concat(this.props.type, " ");
        if (this.props.className) className += "".concat(this.props.className, " ");
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

        if (this.props.break) className += 'break ';
        if (this.props.error || this.state.error || this.state.showGroupError) className += 'has-error ';
        return className;
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.type === GenericFormFieldTypes.HIDDEN) return this.renderGenericFormField(this.props);
        return React.createElement("div", {
          className: this.getClassName()
        }, React.createElement(GenericFormFieldLabel, _extends({}, this.props, {
          value: this.state.value
        })), this.renderGenericFormField(), this.renderError(), this.props.after);
      }
    }, {
      key: "renderGenericFormField",
      value: function renderGenericFormField() {
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
            nativeProps = _objectWithoutProperties(_this$props, ["dataType", "label", "labelAsDefault", "options", "className", "error", "value", "defaultValue", "checked", "type", "after", "validation", "formId", "fieldType"]);

        var props = _objectSpread({}, nativeProps, {
          value: this.state.value,
          onChange: this.onChange,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          'aria-invalid': !!this.state.error,
          'aria-required': validation && validation.mandatory,
          'aria-describedby': !!this.state.error ? GenericFormField.getErrorFieldId(this.props.id) : null,
          ref: this.el
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
            }, label) : null, options.map(function (_ref, i) {
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
        return null;
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        var _this2 = this;

        var stateUpdate = {};

        if (isRadioOrCheckbox(this.props)) {
          stateUpdate.checked = !this.state.checked;
        } else {
          stateUpdate.value = this.getValue();
        }

        this.setState(stateUpdate, function () {
          if (_this2.state.showError) _this2.validate();

          if (_this2.state.showGroupError) {
            _this2.validateGroups();
          }
        });
        if (typeof this.props.onChange === 'function') this.props.onChange(e, this.getValue());
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
        }

        return false;
      }
    }, {
      key: "validate",
      value: function validate() {
        if (this.props.validation) {
          var error = this.getError();
          this.setState({
            error: error,
            showError: true
          });
          if (error) return false;
        } else {
          this.setState({
            showError: true
          });
        }

        return true;
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
      value: function validateGroups() {
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
            groups[key].forEach(function (groupField) {
              groupField[0].showGroupError(true);
            });
            isValid = false;
          } else {
            groups[key].forEach(function (groupField) {
              groupField[0].showGroupError(false);
            });
          }
        }

        return isValid;
      }
    }], [{
      key: "getErrorFieldId",
      value: function getErrorFieldId(id) {
        return "".concat(id, "-error");
      }
    }, {
      key: "registerField",
      value: function registerField(formId, field) {
        if (!_genericForms[formId]) _genericForms[formId] = [];
        _genericForms[formId] = [].concat(_toConsumableArray(_genericForms[formId]), [field]);
      }
    }, {
      key: "unregisterField",
      value: function unregisterField(formId, field) {
        var fields = _toConsumableArray(_genericForms[formId]);

        fields.splice(_genericForms[formId].indexOf(field), 1);
        _genericForms[formId] = fields.length ? fields : null;
      }
    }, {
      key: "getFields",
      value: function getFields(formId) {
        return _genericForms[formId] || [];
      }
    }, {
      key: "registerExtraType",
      value: function registerExtraType(type, options) {
        if (!_extraTypes[type]) _extraTypes[type] = options;
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

  var GenericForm =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GenericForm, _React$Component);

    function GenericForm(props) {
      var _this;

      _classCallCheck(this, GenericForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GenericForm).call(this, props));
      _this.fields = [];
      _this._onSubmit = _this._onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(GenericForm, [{
      key: "render",
      value: function render() {
        return React.createElement("form", {
          onSubmit: this._onSubmit,
          className: 'generic-form ' + (this.props.className ? this.props.className : '')
        }, this.content(), this.props.children);
      }
    }, {
      key: "content",
      value: function content() {
        var _this2 = this;

        return (this.props.fields || []).map(function (f, i) {
          return f ? React.createElement(GenericFormField, _extends({
            formId: _this2.props.id,
            key: i
          }, f)) : null;
        });
      }
    }, {
      key: "_onSubmit",
      value: function _onSubmit(e) {
        var isValid = this.validateFields();

        if (!isValid) {
          e.preventDefault();
          return;
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

        return _objectSpread({}, values, checkboxes);
      }
    }, {
      key: "validateFields",
      value: function validateFields() {
        var fields = GenericFormField.getFields(this.props.id);
        var isValid = true;

        for (var i = 0, iLength = fields.length; i < iLength; i++) {
          var f = fields[i];

          if (f.props.validation) {
            var validField = f.validate();
            if (!validField) isValid = false;
          }
        }

        if (fields[0] && !fields[0].validateGroups()) isValid = false;
        return isValid;
      }
    }]);

    return GenericForm;
  }(React.Component);

  GenericForm.propTypes = {
    id: PropTypes.string,
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
  exports.GenericFormFields = GenericFormFields;
  exports.GenericFormFieldTypes = GenericFormFieldTypes;
  exports.GenericFormFieldDataTypes = GenericFormFieldDataTypes;
  exports.default = GenericForm;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
