import React from 'react';
import GenericFormField from './GenericFormField';
import {defaultFormMethod, isRadioOrCheckbox} from './helpers';

class GenericForm extends React.Component {

  constructor(props) {
    super(props);
    this.fields = [];
    this._onSubmit = this._onSubmit.bind(this);
  }

  render() {
    return <form id={this.props.id} onSubmit={this._onSubmit}
                 method={this.props.method || defaultFormMethod}
                 className={'generic-form ' + (this.props.className ? this.props.className : '')}>
      {this.content()}
      {this.props.children}
    </form>;
  }

  content() {
    if (!this.props.fields || !this.props.fields.length) return;

    const FieldComponent = this.props.FieldComponent || GenericFormField;
    return this.props.fields.map((f, i) => f
      ? <FieldComponent formId={this.props.id} key={i} {...f} />
      : null);
  }

  _onSubmit(e) {
    if (!this.isValid()) {
      e.preventDefault();
      return;
    }
    if (typeof this.props.onSubmit === 'function')
      this.props.onSubmit(e, this.getValues());

  }

  getValues() {
    let checkboxes = {};
    const values = GenericFormField.getFields(this.props.id).reduce((acc, f) => {
      let val = f.getValue();
      if (!isRadioOrCheckbox(f.props)) {
        if (this.props.outputEmptyFields || (val !== '' && val !== null)) acc[f.props.name] = val;
      } else {
        if (!checkboxes[f.props.name]) {
          checkboxes[f.props.name] = [];
        }
        checkboxes[f.props.name].push(val);
      }

      return acc;
    }, {});

    for (let key in checkboxes) {
      checkboxes[key] = checkboxes[key].filter(val => !!val);
      if (!checkboxes[key].length) checkboxes[key] = false;
      else if (!key.endsWith('[]') && checkboxes[key].length === 1) {
        checkboxes[key] = checkboxes[key][0];
      }
    }

    for (let key in checkboxes) {
      if (key.endsWith('[]')) {
        checkboxes[key.replace('[]', '')] = checkboxes[key];
        delete checkboxes[key];
      }
    }

    return {...values, ...checkboxes};
  }

  isValid() {
    const fields = GenericFormField.getFields(this.props.id);
    return !fields.length || fields[0].validateFields();
  }

  reset() {
    GenericFormField.getFields(this.props.id).forEach(f => f.reset());
  }

}

export default GenericForm;
