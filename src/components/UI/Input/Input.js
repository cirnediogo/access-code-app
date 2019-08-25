import React, { Component } from 'react';
import BaseInput from 'muicss/lib/react/input';

import { cpfMask } from './cpfMask'

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', placeholder: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        let value;
        switch (this.props.mask) {
            case 'cpf':
                value = cpfMask(event.target.value);
                break;
            default:
                value = event.target.value;
        }
        this.setState({ value: value })
    }

    handleFocus() {
        let placeholder;
        switch (this.props.mask) {
            case 'cpf':
                placeholder = '___.___.___-__';
                break;
            default:
                placeholder = '';
        }
        this.setState({ placeholder: placeholder })
    }

    handleBlur(event) {
        console.log(event.target);
        console.log('TYPE: ' + event.target.type);
        console.log('invalid: ' + event.target.invalid);
        this.setState({ placeholder: '' })
    }

    render() {
        return (
            <React.Fragment>
                <BaseInput {...this.props}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur} />
            </React.Fragment>
        )
    }
}

export default Input;