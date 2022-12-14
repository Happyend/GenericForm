import { GenericFormFieldTypes } from './types';

export const hasValue = val =>
    !!val;

export const regexMatches = (val, regex) =>
    (regex instanceof RegExp
        ? regex
        : new RegExp(regex)).test(val);


export const isRadioOrCheckbox = ({ type }) =>
    type === GenericFormFieldTypes.CHECKBOX || type === GenericFormFieldTypes.RADIO;

export let errors = {
  mandatory: 'This field is mandatory'
}

export const setErrors = (_errors) => {
  errors = {...errors, ..._errors};
}

export let defaultFormMethod = 'POST';
export const setDefaultFormMethod = (v) => defaultFormMethod = v;
