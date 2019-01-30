import React from 'react';
import { GenericFormFieldTypes } from './types';

const GenericFormFieldLabel = ({
    id,
    label,
    type,
    labelAsDefault,
    value
}) =>
    label && (type !== GenericFormFieldTypes.SELECT || !labelAsDefault || value)
        ? <label htmlFor={id}>
            {label}
        </label>
        : null;

export default GenericFormFieldLabel;
