import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from 'muicss/lib/react/button';

import Input from '../../components/UI/Input/Input';
import { getAccessCode } from './AccessCode';
import axios from '../../axios';

import * as mailPatterns from './mailPatterns.js';
import '../../styles/layout.css';

class Register extends Component {

    state = {
        name: '',
        cpf: '',
        email: '',
        loading: false,
        registered: false,
        error: '',
        info: null
    }

    componentWillMount() {
        this.requestInterceptor = axios.interceptors.request.use(req => {
            this.setState({
                error: ''
            });
            return req;
        });
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

    checkUserParams = (callback) => {
        axios.get('/accounts.json?orderBy="cpf"&equalTo="' + this.state.cpf + '"')
            .then(res => {
                if (Object.keys(res.data).length > 0) {
                    this.requestError({ message: 'Este CPF já está cadastrado.' })
                } else {
                    axios.get('/accounts.json?orderBy="email"&equalTo="' + this.state.email + '"')
                        .then(res2 => {
                            if (Object.keys(res2.data).length > 0) {
                                this.requestError({ message: 'Este e-mail já está cadastrado.' })
                            } else {
                                callback();
                            }
                        })
                        .catch(err => { this.requestError(err) })
                }
            })
            .catch(err => { this.requestError(err) })
    }

    registerHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        this.checkUserParams(() => {
            this.generateAccessCode(0, (accessCode) => {
                const user = {
                    name: this.state.name,
                    cpf: this.state.cpf,
                    email: this.state.email,
                    accesscode: accessCode
                }
                axios.post('/accounts.json', user)
                    .then(() => {
                        this.sendMail(user);
                        this.setState({
                            registered: true,
                            loading: false
                        })
                    })
                    .catch(err => { this.requestError(err) })
            })
        })
    }

    generateAccessCode = (shift, callback) => {
        const accessCode = getAccessCode(shift, this.state.cpf);
        axios.get('/accounts.json?orderBy="accesscode"&equalTo="' + accessCode + '"')
            .then(res => {
                if (Object.keys(res.data).length > 0) {
                    this.generateAccessCode(++shift, callback);
                } else {
                    callback(accessCode);
                }
            })
            .catch(err => { this.requestError(err) })
    }

    sendMail(user) {
        const data = {
            assunto: 'Cadastro efetuado com sucesso.',
            destinatarios: this.state.email,
            corpo: mailPatterns.accessCodePlain(user.name, user.accesscode),
            corpoHtml: mailPatterns.accessCodePlain(user.name, user.accesscode)
        }
        axios.post('https://us-central1-access-code-app.cloudfunctions.net/sendMail', data)
            .then(() => { })
            .catch(() => { })
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

    onInputChange = (object, value) => {
        this.setState({
            [object]: value
        })
    }

    render() {
        let content;
        if (!this.state.registered && !this.state.error) {
            let footerContent = <div className="loader">Loading...</div>;
            if (!this.state.loading) {
                footerContent = (
                    <div>
                        <p>
                            Já possui um código de acesso?
                        </p>
                        <Link to="/auth">
                            <Button variant="flat" color="primary">Entrar</Button>
                        </Link>
                    </div>
                )
            }
            content = (
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
                    {footerContent}
                    {content}
                </div>
            )
        } else if (this.state.registered) {
            let contact = "Se você não receber o e-mail nos próximos minutos entre em contato para solucionar o problema";
            if (this.state.info && this.state.info.phone) {
                contact += " por meio do número " + this.state.info.phone;
                if (this.state.info.email) {
                    contact += " ou";
                }
            }
            if (this.state.info && this.state.info.email) {
                contact += " pelo e-mail " + this.state.info.email;
            }
            contact += ".";
            content = (
                <div>
                    <p>Cadastro efetuado com sucesso.</p>
                    <p>O seu código de acesso foi enviado para o e-mail cadastrado.</p>
                    <p className='soft'>
                        O código de acesso é pessoal e intransferível.
                        Não deixe que outras pessoas tenham acesso a ele.
                    </p>
                    <p className='soft'>
                        {contact}
                    </p>
                    <div>
                        <p>
                            Voltar para a página inicial?
                        </p>
                        <Link to="/auth">
                            <Button variant="flat" color="primary">Voltar</Button>
                        </Link>
                    </div>
                </div>
            );
        } else {
            let contact = "Se necessário entre em contato para solucionar o problema";
            if (this.state.info && this.state.info.phone) {
                contact += " por meio do número " + this.state.info.phone;
                if (this.state.info.email) {
                    contact += " ou";
                }
            }
            if (this.state.info && this.state.info.email) {
                contact += " pelo e-mail " + this.state.info.email;
            }
            contact += ".";
            content = (
                <div>
                    <p>Erro ao efetuar o cadastro.</p>
                    <p className='error'>{this.state.error}</p>
                    <p>{contact}</p>
                    <div>
                        <p>
                            Voltar para a página inicial?
                        </p>
                        <Link to="/auth">
                            <Button variant="flat" color="primary">Voltar</Button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div className='container'>
                {content}
            </div>
        )
    }

}

export default Register;