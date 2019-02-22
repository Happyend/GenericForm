import React from 'react';
import PropTypes from 'prop-types';
import GenericFormField  from './GenericFormField';
import { isRadioOrCheckbox } from './helpers';

class GenericForm extends React.Component {

    constructor(props) {
        super(props);
        this.fields = [];
        this._onSubmit = this._onSubmit.bind(this);
    }

    render() {
        return <form onSubmit={ this._onSubmit } className={ 'generic-form '+(this.props.className ? this.props.className: '') }>
            { this.content() }
            { this.props.children }
        </form>;
    }

    content() {
        return (this.props.fields || []).map((f, i) => f ?
            <GenericFormField formId={this.props.id} key={i} {...f} /> : null);
    }

    _onSubmit(e) {
        const fields = GenericFormField.getFields(this.props.id);
        if (fields.length) {
            const isValid = fields[0].validateFields();
            if (!isValid) {
                e.preventDefault();
                return;
            }
        }
        if (typeof this.props.onSubmit === 'function')
            this.props.onSubmit(e, this.getValues());

    }

    getValues() {
        let checkboxes = {};
        const values = GenericFormField.getFields(this.props.id).reduce((acc, f) => {
            let val = f.getValue();
            if (!isRadioOrCheckbox(f.props)) {
                if (val !== '' && val !== null) acc[f.props.name] = f.getValue();
            } else {
                if(!checkboxes[f.props.name]) {
                    checkboxes[f.props.name] = [];
                }
                checkboxes[f.props.name].push(val);
            }

            return acc;
        }, {});

        for(let key in checkboxes) {
            checkboxes[key] = checkboxes[key].filter(val => !!val);
            if (!checkboxes[key].length) checkboxes[key] = false;
            else if (!key.endsWith('[]') && checkboxes[key].length === 1) {
                checkboxes[key] = checkboxes[key][0];
            }
        }

        for(let key in checkboxes) {
            if (key.endsWith('[]')) {
                checkboxes[key.replace('[]','')] = checkboxes[key];
                delete checkboxes[key];
            }
        }

        return { ...values, ...checkboxes };
    }

}

GenericForm.propTypes = {
    id: PropTypes.string,
    onError: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default GenericForm;
