import React from 'react';
import {render} from 'react-dom';
import GenericForm, {GenericFormFieldDataTypes, GenericFormFieldTypes, setErrors } from '../src/index';
import GenericFormField from '../src/GenericFormField';


setErrors({ mandatory: 'Toto'})
class App extends React.Component {


  constructor(props) {
    super(props);
    this.form2Ref = React.createRef();
    GenericFormField.setRequiredLabelSuffix('*');
  }

  render() {
    return <div>

      <h1> Test 1</h1>
      <GenericForm id="test"
                   onSubmit={(e, vals) => {
                     e.preventDefault();
                     console.log(vals);
                   }}
                   onError={(err, f) => console.log('Error', err, f)}
                   fields={[
                     {
                       type: GenericFormFieldTypes.TEXT,
                       name: 'firstname',
                       id: 'test-firstname-field',
                       label: 'Firstname',
                       requiredLabelSuffix: ' This field is mandatory',
                       validation: {
                         mandatory: true,
                         validateOnBlur: false,
                         errorEmpty: 'Firstname is mandatory'
                       }
                     },
                     {
                       type: GenericFormFieldTypes.TEXT,
                       name: 'lastname',
                       id: 'test-lastname-field',
                       label: 'Lastname',
                       validation: {
                         mandatory: true
                       }
                     },
                     {
                       type: GenericFormFieldTypes.SELECT,
                       name: 'title',
                       id: 'test-title-field',
                       label: 'Title',
                       labelAsDefault: true,
                       options: [
                         {
                           label: 'Pick',
                           value: ''
                         },
                         {
                           label: 'Ms',
                           value: 'Ms'
                         },
                         {
                           label: 'Mr',
                           value: 'Mr'
                         },
                       ],
                       validation: {
                         mandatory: true
                       }
                     },
                     {
                       type: GenericFormFieldTypes.CHECKBOX,
                       name: 'terms',
                       id: 'test-terms-field',
                       value: 'accept',
                       label: 'Accept terms and conditions',
                       validation: {
                         mandatory: true
                       },
                       dataType: GenericFormFieldDataTypes.BOOL
                     }
                   ]}>
        <p>Optional checkboxes</p>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.CHECKBOX}
          id="test-c1-field"
          label="C1"
          value={"c1"}
          name="c1"/>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.CHECKBOX}
          id="test-c2-field"
          label="C2"
          name="c2"/>
        <p>Field with forbidden value ','</p>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.TEXT}
          id="test-address-field" name={"address"}
          label="Address"
          validation={{
            mandatory: true,
            positiveRegex: {
              'Commas are not allowed': ','
            }
          }}/>
        <p>Field with mandatory comma</p>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.TEXT}
          id="test-address-field" name={"address"}
          label="Address"
          validation={{
            mandatory: true,
            negativeRegex: {
              'Field must contain a comma': ','
            }
          }}/>
        <p>Field with customErrorHandler</p>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.TEXT}
          id="test-bad-valuefield" name={"bad-value"}
          label="Do not enter 'Bad value'"
          validation={{
            mandatory: true,
            customErrorHandlers: {
              'Do not enter "Bad value"': v => v === 'Bad value'
            }
          }}/>
        <GenericFormField
          formId="test"
          type={GenericFormFieldTypes.SUBMIT}
          value="Send"
        />
      </GenericForm>

      <h1>Test 2: Submit is disabled until the form is valid</h1>
      <GenericForm id="test2"
                   ref={this.form2Ref}
                   onSubmit={(e, vals) => {
                     e.preventDefault();
                     console.log(vals);
                   }}>
        <p>Group with at least one mandatory checkbox</p>
        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.CHECKBOX}
          id="test-checkbox-field2"
          name={"checkbox"}
          value={"value1"}
          label="Checkbox 1"
          validation={{
            group: 'checkbox-group',
            errorGroup: 'You must at least check one checkbox'
          }}/>
        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.CHECKBOX}
          id="test-checkbox-field2"
          name={"checkbox"}
          value={"value2"}
          label="Checkbox 2"
          validation={{
            group: 'checkbox-group'
          }}/>
        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.PASSWORD}
          id="test-checkbox-field3"
          name={"password1"}
          label="Password 1"
          validation={{
            identicalGroup: 'password-group',
            errorIdenticalGroup: 'Both passwords must be identical'
          }}/>
        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.PASSWORD}
          id="test-checkbox-field4"
          name={"password2"}
          label="Password 2"
          validation={{
            identicalGroup: 'password-group',
            errorIdenticalGroup: 'Both passwords must be identical'
          }}/>

        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.RADIO}
          id="test-radio-field"
          name={"radio"}
          value={"value1"}
          label="Radio 1"/>
        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.RADIO}
          id="test-radio-field2"
          name={"radio"}
          value={"value2"}
          label="Radio 2"/>

        <GenericFormField
          formId="test2"
          type={GenericFormFieldTypes.SUBMIT}
          disableUntilValid
          value="Send"
        />
      </GenericForm>

      <button type="button" onClick={() => this.form2Ref.current.reset()}>Reset</button>

    </div>;

  }
}

render(<App/>, document.getElementById('app'));
