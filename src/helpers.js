import { GenericFormFieldTypes } from './types';

export const hasValue = val =>
    !!val;

export const regexMatches = (val, regex) =>
    (regex instanceof RegExp
        ? regex
        : new RegExp(regex)).test(val);


export const isRadioOrCheckbox = ({ type }) =>
    type === GenericFormFieldTypes.CHECKBOX || type === GenericFormFieldTypes.RADIO;
