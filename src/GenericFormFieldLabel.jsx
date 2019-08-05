import React from 'react';
import { GenericFormFieldTypes } from './types';

const GenericFormFieldLabel = ({
    id,
    label,
    type,
    labelAsDefault,
    value,
    isRequired,
}) =>
    label && (type !== GenericFormFieldTypes.SELECT || !labelAsDefault || value)
        ? <label htmlFor={id}>
            {label} {isRequired && '*'}
        </label>
        : null;

export default GenericFormFieldLabel;
