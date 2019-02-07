# GenericForm [![npm][npm-image]][npm-url]

![logo](https://s3.amazonaws.com/word-art/5c5c51c120152c19834ad3d2.png)

[npm-image]: https://img.shields.io/npm/v/generic-form.svg
[npm-url]: https://www.npmjs.com/package/generic-form

GenericForm is a React form validation plugin. 
Each form field can use a validation prop to define what format is expected.

## Installation

```
$ yarn add generic-form
```

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
        formId="my-form"
        type={GenericFormFieldType.EMAIL} 
        name="email" 
        id="my-form-email"
        validation={{ mandatory: true}} />
    <GenericFormField 
        formId="my-form"
        type={GenericFormFieldType.PASSWORD} 
        name="password" 
        id="my-form-password"
        validation={{ mandatory: true}} />
    <GenericFormField 
        formId="my-form"
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
        'No commas are allowed': /,/
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
        'The field must contain a comma': /,/
        }
    } } />
```

#### group (string)
The group prop marks a field as part of a group, at least one (or groupMin) fields in a group
should be valid for the form to be validated, if the requirement isn't met the field will display
the groupError prop
```
<GenericFormField
    validation={ {
        group: 'field-group',
        groupMin: 1,
        groupError: 'At least one of these fields is required'
    } } />
```

## Using external libraries

The package supports external library components through the GenericFormField static method 'registerExtraType'.
### registerExtraType arguments

#### type (string)
A string to identify the new GenericFormField type

#### customComponent methods (object)
An object that has two methods, render and getValue:
##### render(libraryProps, componentProps, libraryState)
The render method should return the custom component.
##### getValue
A method scoped to the component that allows access to component props and should return the component value.

### registerExtraType example

Here is an example of how to register a custom component into the form validation using
the react-text-mask plugin.

```
GenericFormField.registerExtraType('mask', {
  render(sharedProps, { mask }) {

    return <TextMask
      { ...sharedProps }
      mask={ mask }
      guide={ false }
      type='text'/>;

  },
  getValue() {
    return this.el.current.inputElement.value;
  },
});
```
By registering an extra type you may then use the component in your forms by simply using the string you registered:
```
<GenericFormField
    id='masked-field'
    name='masked-field'
    type='mask'
    mask={[/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/]} />
```


## Scripts

### Running the example form

An example is provided with the repository, you may start the parcel dev server by running the following command:
```
$ yarn example
```

### Building the module
```
$ yarn build
```
