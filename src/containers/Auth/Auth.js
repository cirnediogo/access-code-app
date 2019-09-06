import React from 'react';
import { Link } from "react-router-dom";
import Button from 'muicss/lib/react/button';

import Input from '../../components/UI/Input/Input';
import axios from '../../axios';
import '../../styles/layout.css';

class Auth extends React.Component {

    state = {
        accesscode: '',
        loading: false,
        error: false,
        info: null,
        user: null
    }

    componentDidMount() {
        axios.get('/info.json')
            .then(res => {
                this.setState({
                    info: res.data,
                })
            })
            .catch(err => { })
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }

    requestError(error) {
        let errorMessage = 'Erro desconhecido.';
        if (error.message) {
            errorMessage = error.message;
        }
        this.setState({
            error: errorMessage,
            loading: false
        })
    }

    authUser = (userData) => {
        this.setState({
            error: null,
            loading: false,
            accesscode: '',
            user: userData
        })
    }

    authHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            error: false
        });
        axios.get('/accounts.json?orderBy="accesscode"&equalTo="' + this.state.accesscode + '"')
            .then(res => {
                if (Object.keys(res.data).length === 1) {
                    this.authUser(res.data[Object.keys(res.data)[0]]);
                } else {
                    this.requestError({ message: 'Código de acesso não encontrado.' })
                }
            })
            .catch(err => { this.requestError(err) })
    }

    logoutHandler = (event) => {
        this.setState({
            user: null
        })
    }

    onInputChange = (object, value) => {
        this.setState({
            [object]: value
        })
    }

    render() {
        let footerContent;
        if (this.state.loading) {
            footerContent = <div className="loader">Loading...</div>;
        } else {
            footerContent = (
                <React.Fragment>
                    <p>
                        Ainda não possui um código de acesso?
                    </p>
                    <Link to="/register">
                        <Button variant="flat" color="primary">Cadastrar</Button>
                    </Link>
                </React.Fragment>
            )
        }
        let errorMessage = '';
        let contactInfo = '';
        if (this.state.error) {
            errorMessage = <p className='error'>{this.state.error}</p>
            contactInfo = "Se necessário entre em contato para solucionar o problema";
            if (this.state.info && this.state.info.phone) {
                contactInfo += " por meio do número " + this.state.info.phone;
                if (this.state.info.email) {
                    contactInfo += " ou";
                }
            }
            if (this.state.info && this.state.info.email) {
                contactInfo += " pelo e-mail " + this.state.info.email;
            }
            contactInfo += ".";
            contactInfo = <p>{contactInfo}</p>
        }
        let mainContent;
        if (this.state.user) {
            let name = this.state.user.name
            let names = name.split(' ');
            if (names.length > 1) {
                name = names[0] + ' ' + names[1];
            }
            mainContent = (
                <div>
                    <h2>Bem-vindo {name}</h2>
                    <p>Agora você possui acesso total ao sistema.</p>
                    
                    <Button variant="flat" color="danger" onClick={this.logoutHandler}>SAIR</Button>
                </div>
            )
        } else {
            mainContent = (
                <div>
                    <h1>Bem-vindo</h1>
                    <p>Utilize o seu código de acesso para entrar.</p>
                    <form onSubmit={this.authHandler} >
                        <Input label="Código de acesso"
                            value={this.state.accesscode}
                            name='accesscode'
                            onChange={this.onInputChange}
                            type='text'
                            required
                            floatingLabel={true} />
                        <Button variant="raised" color="primary">Entrar</Button>
                    </form>
                    {errorMessage}
                    <p className='soft'>
                        O código de acesso é aquele gerado após feito o cadastro e enviado para o e-mail informardo.
                    </p>
                    {contactInfo}
                    {footerContent}
                </div>
            )
        }
        return (
            <div className='container'>
                {mainContent}
            </div>
        )
    }

}

export default Auth;