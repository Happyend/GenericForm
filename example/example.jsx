import React from 'react';
import { render } from 'react-dom';
import GenericForm, { GenericFormFieldDataTypes, GenericFormFieldTypes } from '../src/index';
import GenericFormField from '../src/GenericFormField';

const App = () =>
    <div>

        <h1> Test 1</h1>
        <GenericForm id="test"
                     onSubmit={(e, vals) => {
                         e.preventDefault();
                         console.log(vals);
                     }}
                     onError={(err,f) => console.log('Error', err, f) }
                     fields={[
            {
                type: GenericFormFieldTypes.TEXT,
                name: 'firstname',
                id: 'test-firstname-field',
                label: 'Firstname',
                validation: {
                    mandatory: true,
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
                value:'accept',
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
                name="c1" />
            <GenericFormField
                formId="test"
                type={GenericFormFieldTypes.CHECKBOX}
                id="test-c2-field"
                label="C2"
                name="c2" />
            <p>Field with forbidden value ','</p>
            <GenericFormField
                formId="test"
                type={GenericFormFieldTypes.TEXT}
                id="test-address-field" name={"address"}
                label="Address"
                validation={ {
                    mandatory: true,
                    positiveRegex: {
                        'Commas are not allowed': ','
                    }
                } } />
            <p>Field with mandatory comma</p>
            <GenericFormField
                formId="test"
                type={GenericFormFieldTypes.TEXT}
                id="test-address-field" name={"address"}
                label="Address"
                validation={ {
                    mandatory: true,
                    negativeRegex: {
                        'Field must contain a comma': ','
                    }
                } } />
            <p>Group with at least one mandatory checkbox</p>
            <GenericFormField
                formId="test"
                type={GenericFormFieldTypes.CHECKBOX}
                id="test-checkbox-field"
                name={"checkbox"}
                value={"value1"}
                label="Checkbox 1"
                validation={ {
                    group:'checkbox-group',
                    errorGroup: 'You must at least check one checkbox'
                } } />
            <GenericFormField
                formId="test"
                type={GenericFormFieldTypes.CHECKBOX}
                id="test-checkbox-field"
                name={"checkbox"}
                value={"value2"}
                label="Checkbox 2"
                validation={ {
                    group:'checkbox-group'
                } } />
            <GenericFormField
                formId="test"
                disableUntilValid
                type={GenericFormFieldTypes.SUBMIT}
                value="Send"
            />
        </GenericForm>

        <h2>Test 2</h2>
        <GenericForm id="test2"
            onSubmit={(e, vals) => {
                e.preventDefault();
                console.log(vals);
            }}>
            <GenericFormField
                type={GenericFormFieldTypes.SUBMIT}
                value="Send"
            />
        </GenericForm>

    </div>;


render(<App />, document.getElementById('app'));
