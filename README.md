# GenericForm

GenericForm is a React form validation plugin. 
Each form field can use a validation prop to define what format is expected.

## Components

The library uses a form ID to handle form validation. You may use the GenericForm component
with a fields prop to create your form or you can use standard JSX and inject GenericFormField components
into the form by specifying the formId prop.

### Examples

#### A GenericForm component that handles its own fields

```jsx
<GenericForm 
    id="my-form"
    fields={ [
        {
            type: GenericFormFieldType.EMAIL,
            id: 'my-form-email',
            name: 'email',
            validation: {
                mandatory: true
            }
        },
        {
            type: GenericFormFieldType.PASSWORD,
            id: 'my-form-password',
            name: 'password',
            validation: {
                mandatory: true
            }
        },
        {
            type: GenericFormFieldType.SUBMIT,
            value: 'Login'
        }
    ] }
    />
```
#### A GenericForm that uses GenericFormField components
```jsx
<GenericForm id="my-form">
    <GenericFormField 
        type={GenericFormFieldType.EMAIL} 
        name="email" 
        id="my-form-email"
        validation={{ mandatory: true}} />
    <GenericFormField 
        type={GenericFormFieldType.PASSWORD} 
        name="password" 
        id="my-form-password"
        validation={{ mandatory: true}} />
    <GenericFormField 
        type={GenericFormFieldType.SUBMIT} 
        value="Login" />
</GenericForm>
```

## Validation

### Validation Object

#### mandatory (boolean)
 marks the field as mandatory, if value isn't set by user it will display
the 'errorEmpty' string


#### errorEmpty (string)
The string will be displayed if the field is empty and the mandatory boolean was set


#### positiveRegex (object)
The positiveRegex prop allows you to define props that will trigger errors when the value of the field
**matches** the regex.
```
<GenericFormField
    validation={ {
        positiveRegex: {
        [/,/]: 'No commas are allowed'
        }
    } } />
```

#### negativeRegex (object)
The negativeRegex prop allows you to define props that will trigger errors when the value of the field
**doesn't match** the regex.
```
<GenericFormField
    validation={ {
        negativeRegex: {
        [/,/]: 'The field must contain a comma'
        }
    } } />
```
