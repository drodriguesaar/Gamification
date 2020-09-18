import React from 'react';
import Lottie from 'lottie-react';
import { Container, Row, Col, Card, Alert, Button, Form } from 'react-bootstrap';
import CarregandoAnim from '../animations/carregando_anim.json';
import MuiAvatar from '@material-ui/core/Avatar';
class ConversaComponent extends React.Component {

    constructor(props) {
        super();
        this.state = { mensagens: [], isCarregando: true, corpoMensagem: '' };
        this.handleFimAnimacaoCommand = this.handleFimAnimacao.bind(this);
        this.handleNovaMensagemCommand = this.handleNovaMensagem.bind(this);
        this.handleMensagemChangeCommand = this.handleMensagemChange.bind(this);
    }

    handleNovaMensagem(e) {
        e.preventDefault();

        if(this.state.corpoMensagem===''){
            return;
        }

        let countMensagens = this.state.mensagens.length + 1;
        let corponovamensagem = this.state.corpoMensagem;
        let mensagensCopy = this.state.mensagens;
        let dateNovaMensagem = new Date();

        let horaEnvio = `${dateNovaMensagem.getHours()}:${dateNovaMensagem.getMinutes()}`

        console.log(corponovamensagem);

        let novamensagem = {
            corpo: corponovamensagem,
            hora: horaEnvio,
            nome: 'Você',
            foto: 'https://tinyurl.com/y23lhl35',
            dono: true,
            id: countMensagens

        };

        mensagensCopy.push(novamensagem);

        this.setState({ mensagens: mensagensCopy, corpoMensagem: '' });
    }


    handleMensagemChange(e) {
        e.preventDefault();
        let mensagem = e.target.value;
        this.setState({ corpoMensagem: mensagem });
    }



    handleFimAnimacao() {

        let novasmensagens = [];
        for (let index = 0; index < 6; index++) {
            novasmensagens.push({
                corpo: 'teste abc 123',
                hora: '11:30',
                nome: 'Fulano',
                foto: 'https://tinyurl.com/y23lhl35',
                dono: ((index % 2) === 0),
                id: index
            });
        }
        this.setState({ mensagens: novasmensagens, isCarregando: false });
    }

    renderMensagemRecebida(mensagem) {
        return (
            <Row>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <MuiAvatar src={mensagem.foto} alt="perfil" />
                </Col>
                <Col xs={9} sm={9} md={9} lg={9}>
                    <Alert key={mensagem.key} border="primary" variant="dark"
                        style={{ backgroundColor: '#F8F8EF' }}
                    >
                        <b>{mensagem.nome}</b> disse: <br />
                        {mensagem.corpo}
                    </Alert>
                </Col>
            </Row>
        );
    }
    renderMensagemEnviada(mensagem) {
        return (
            <Row>
                <Col xs={9} sm={9} md={9} lg={9}>
                    <Alert key={mensagem.key} border="success" variant="success"
                        style={{ backgroundColor: '#F7EFF8' }}>
                        <b>Você disse:</b> {mensagem.corpo}
                        <br />
                        <small>{`as ${mensagem.hora}`}</small>
                    </Alert>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <MuiAvatar src={mensagem.foto} alt="perfil" />
                </Col>
            </Row>
        );
    }


    renderMensagens() {
        return this.state.mensagens.map((mensagem, index) =>
            <>
                {(!mensagem.dono) ? this.renderMensagemRecebida(mensagem) : this.renderMensagemEnviada(mensagem)}
                <br />
            </>
        );
    }


    render() {

        let _content = this.state.isCarregando ?
            <Lottie
                animationData={CarregandoAnim}
                autoPlay={true}
                loop={false}
                onComplete={this.handleFimAnimacaoCommand}
            /> :
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header className="text-center text-dark">
                                <h3>Conversa</h3>
                            </Card.Header>
                            <Card.Body>
                                {this.renderMensagens()}
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xs={9} sm={9} md={9} lg={9}>
                                        <Form.Control
                                            size="lg"
                                            type="text" value={this.state.corpoMensagem}
                                            placeholder="Digite sua mensagem..."
                                            onChange={this.handleMensagemChangeCommand}
                                        />
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} block>
                                        <Button
                                            size="lg"
                                            onClick={this.handleNovaMensagemCommand}>
                                            Enviar
                                    </Button>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>;

        return (<div style={{ paddingBottom: 160 }}>
            <br />
            {_content}

        </div>);
    }
}
export default ConversaComponent;
