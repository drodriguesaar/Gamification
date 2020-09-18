import React from 'react';
import Session from 'store2';
import Crypto from 'crypto-js';
import Lottie from 'lottie-react';
import Chaves from '../chaves.js';
import CaixaAlerta from './reutilizaveis/CaixaAlertaComponent.js';
import JogadorServices from '../services/JogadorServices.js';
import ControleAnim from '../animations/controle_anim.json';
import ErroEmoji from '../images/erro_emoji_morto_10.png';
import { Button, Form, Container, Row, Col, Spinner, Fade } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import MTextField from '@material-ui/core/TextField';
import MuiFade from '@material-ui/core/Fade';

const MTextStyles = withStyles(theme => ({
    root: {
        '& label.Mui-focused': { color: '#ffc107', borderBottomColor: '#ffc107' },
        '& .MuiInputBase-root': { color: '#ffc107', borderBottomColor: '#ffc107' },
        '& .MuiFormLabel-root': { color: '#ffc107', borderBottomColor: '#ffc107' },
        '& .MuiFilledInput-underline:before': { borderBottomColor: '#ffc107' },
        '& .MuiFilledInput-underline:after': { borderBottomColor: '#ffc107' }
    }
}))(MTextField);

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nuRA: '',
            coSenha: '',
            variant: '',
            btnText: '>_ Press Start!',
            isLoginInvalido: false,
            icExibeForm: false,
            icErroBackEnd: false,
            isProcessando: false,
            deTextoErro: '',
            imgErro: null
        };
        this.handleLoginCommand = this.handleLogin.bind(this);
        this.handleChangeCommand = this.handleChange.bind(this);
        this.handleFimAnimacaoCommand = this.handleFimAnimacao.bind(this);
    }

    handleFimAnimacao() {
        this.setState({ icExibeForm: true });
    }

    handleLogin(e) {

        const { history } = this.props;

        e.preventDefault();
        this.setState({
            isProcessando: true,
            btnText: 'Aguarde...',
            imgErro: null
        });

        if (this.state.nuRA === '' || this.state.coSenha === '') {
            this.setState({
                deTextoErro: "campos obrigatórios não preenchidos!",
                isLoginInvalido: true,
                isProcessando: false,
                variant: 'warning',
                btnText: '>_ Press Start!',
                imgErro: ErroEmoji
            });
            return;
        }

        JogadorServices
            .Login(this.state.nuRA, this.state.coSenha)
            .then((result) => {
                this.setState({ isProcessando: false, btnText: '>_ Press Start!' });
                switch (result.status) {
                    case 200:

                        this.setState({
                            isSucesso: true
                        });
                        let _encData = Crypto.AES.encrypt(JSON.stringify(result.data), Chaves.Sal).toString();
                        Session.set(Chaves.UsuarioStoreKey, _encData);
                        history.push('/h');
                        break;
                    case 500:
                        this.setState({
                            isLoginInvalido: true,
                            icErroBackEnd: true,
                            deTextoErro: 'ocorreu um erro ao validar as informações de login!',
                            variant: 'danger'
                        });
                        break;
                    default:
                        this.setState({
                            isLoginInvalido: true,
                            deTextoErro: 'login não efetuado, verifique suas credenciais e tente novamente!',
                            variant: 'warning'
                        });
                        break;
                }
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    isLoginInvalido: true,
                    variant: 'danger',
                    btnText: '>_ Press Start!',
                    deTextoErro: 'ocorreu um erro inesperado, tente novamente!',
                    isProcessando: false
                });
            });
    }
    handleChange(e) {
        let valor = e.target.value.trim();
        let nome = e.target.name.trim();
        this.setState({
            [nome]: valor
        });
    }
    render() {
        let _carregandoAnim = this.state.isProcessando ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : null;
        let _sucessoLogin = this.state.isLoginInvalido ? <CaixaAlerta tipo={this.state.variant} titulo={"Ops"} descricao={this.state.deTextoErro} Img={this.state.imgErro} /> : null;

        return (<div style={{ paddingTop: 50, paddingLeft: 20, paddingRight: 20 }}>


            <Container fluid>
                <Row>

                    <Col sm={0} xs={0} md={3} lg={4} />
                    <Col sm={12} xs={12} md={6} lg={4}>
                        <Row>
                            <Col sm={12} xs={12} md={12} lg={12}>
                                <Lottie
                                    style={{ height: '300px' }}
                                    animationData={ControleAnim}
                                    autoplay={true}
                                    loop={false}
                                    onComplete={this.handleFimAnimacaoCommand}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} xs={12} md={12} lg={12}>
                                <MuiFade in={this.state.icExibeForm}>
                                    <Form onSubmit={this.handleLoginCommand}>
                                        <Form.Group>

                                            <MTextStyles
                                                variant="filled"
                                                margin="none"
                                                fullWidth
                                                id="nuRA"
                                                label="RA"
                                                name="nuRA"
                                                type="number"
                                                autoFocus={true}
                                                color="primary"
                                                placeholder="Insira seu RA..."
                                                value={this.state.nuRA}
                                                disabled={this.state.isProcessando}
                                                onChange={this.handleChangeCommand} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <MTextStyles
                                                variant="filled"
                                                margin="none"
                                                fullWidth
                                                id="coSenha"
                                                label="Senha"
                                                type="password"
                                                name="coSenha"
                                                color="primary"
                                                value={this.state.coSenha}
                                                placeholder="Insira sua senha..."
                                                disabled={this.state.isProcessando}
                                                onChange={this.handleChangeCommand} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button block
                                                variant="outline-warning"
                                                size="lg"
                                                type="submit"
                                                disabled={this.state.isProcessando} >
                                                {_carregandoAnim} {this.state.btnText}
                                            </Button>
                                        </Form.Group>
                                        <Form.Group>
                                            {_sucessoLogin}
                                        </Form.Group>
                                    </Form>
                                </MuiFade>

                            </Col>
                        </Row>
                    </Col>
                    <Col sm={0} xs={0} md={3} lg={4} />

                </Row>
            </Container>

        </div>);
    }
}
export default LoginComponent;