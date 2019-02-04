import React from 'react';
import { render } from 'react-dom';
import GenericForm, { GenericFormFieldDataTypes, GenericFormFieldTypes } from '../src/index';
import GenericFormField from '../src/GenericFormField';

const App = () =>
    <div>
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
            <GenericFormField type={GenericFormFieldTypes.SUBMIT} value="Send"/>
        </GenericForm>
    </div>;


render(<App />, document.getElementById('app'));
