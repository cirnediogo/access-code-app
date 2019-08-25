import React from 'react';
import { Link } from "react-router-dom";
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

import '../../styles/layout.css';

const auth = (props) => {

    return (
        <div className='container'>
            <div >
                <h1>Bem-vindo</h1>
                <p>Utilize o seu código de acesso para entrar.</p>
                <form>
                    <Input label="Código de acesso" floatingLabel={true} />
                    <Button variant="raised" color="primary">Entrar</Button>
                </form>
                <p className='soft'>
                    O código de acesso é aquele gerado após feito o cadastro e enviado para o e-mail informardo.
                </p>
                <p>
                    Ainda não possui um código de acesso?
                </p>
                <Link to="/register">
                    <Button variant="flat" color="primary">Cadastrar</Button>
                </Link>
            </div>
        </div>
    )

}

export default auth;