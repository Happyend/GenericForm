import React from 'react';
import GenericFormField from './GenericFormField';

const GenericFormFields = ({
    fields,
    formId,
    className,
}) =>
    <div className={ 'generic-form-fields ' + (className || '') }>
        {
            fields.map((f, i) => f
                ? <GenericFormField formId={ formId } key={ i } { ...f } />
            : null )
        }
    </div>;

export default GenericFormFields;
