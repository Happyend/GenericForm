import React from 'react';
import { GenericFormFieldTypes } from './types';

const GenericFormFieldLabel = ({
    id,
    label,
    type,
    labelAsDefault,
    value,
    requiredSuffix,
    validation,
}) =>
    label && (type !== GenericFormFieldTypes.SELECT || !labelAsDefault || value)
        ? <label htmlFor={id}>
            {label}
            {
              (validation && validation.mandatory) &&
                <span className="required-text">{requiredSuffix}</span>
            }
        </label>
        : null;

export default GenericFormFieldLabel;
