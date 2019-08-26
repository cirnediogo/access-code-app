import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'muicss/lib/react/button';

import Input from '../../components/UI/Input/Input'
import { getAccessCode } from './AccessCode'

import '../../styles/layout.css';

class Register extends Component {

    state = {
        name: '',
        cpf: '',
        email: '',
        code: ''
    }

    registerHandler = (event) => {
        event.preventDefault();
        const accessCode = getAccessCode(this.state.cpf);
        console.log(accessCode);
        this.setState({
            code: accessCode
        })
    }

    onInputChange = (object, value) => {
        this.setState({
            [object]: value
        })
    }

    render() {
        return (
            <div className='container'>
                <div >
                    <h1>Bem-vindo</h1>
                    <p>Cadastre-se para receber um código de acesso.</p>
                    <form onSubmit={this.registerHandler} >
                        <Input label="Nome completo"
                            value={this.state.name}
                            name='name'
                            onChange={this.onInputChange}
                            type='text'
                            required
                            floatingLabel={true} />
                        <Input label="CPF (apenas números)"
                            value={this.state.cpf}
                            name='cpf'
                            onChange={this.onInputChange}
                            type="text"
                            mask="cpf"
                            required floatingLabel={true} />
                        <Input label="E-mail"
                            value={this.state.email}
                            name='email'
                            onChange={this.onInputChange}
                            type="email"
                            required
                            floatingLabel={true} />
                        <p className='soft'>
                            Obs.: Todos os campos são obrigatórios.
                        </p>
                        <Button variant="raised" color="primary">Cadastrar</Button>
                    </form>
                    <p>
                        Já possui um código de acesso?
                    </p>
                    <Link to="/auth">
                        <Button variant="flat" color="primary">Entrar</Button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default Register;