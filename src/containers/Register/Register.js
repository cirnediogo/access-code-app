import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'muicss/lib/react/button';

import Input from '../../components/UI/Input/Input'

import '../../styles/layout.css';

class Register extends Component {

    render() {
        return (
            <div className='container'>
                <div >
                    <h1>Bem-vindo</h1>
                    <p>Cadastre-se para receber um código de acesso.</p>
                    <form>
                        <Input label="Nome completo" required floatingLabel={true} />
                        <Input label="E-mail" type="email" required floatingLabel={true} />
                        <Input label="CPF (apenas números)" type="text" mask="cpf" required floatingLabel={true} />
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