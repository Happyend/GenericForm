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
        ? <div htmlFor={id}>
            {label}
        </div>
        : null;

export default GenericFormFieldLabel;
