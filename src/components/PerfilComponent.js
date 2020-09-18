import React from 'react';
import Session from 'store2';
import Chaves from '../chaves';
import Crypto from 'crypto-js';
import { Container, Row, Col } from 'react-bootstrap';
import GridDesafiosComponent from '../components/reutilizaveis/GridDesafiosComponent';
import DetalheJogadorComponent from '../components/reutilizaveis/DetalheJogadorComponent';

class PerfilComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { perfilAluno: {} };
    }
    componentDidMount() {
        let alunoDataBytes = Crypto.AES.decrypt(Session.get(Chaves.UsuarioStoreKey), Chaves.Sal);
        let alunoJSON = JSON.parse(alunoDataBytes.toString(Crypto.enc.Utf8));
        this.setState({ perfilAluno: alunoJSON.data });
    }
    
    render() {
        return (<>
            <Container fluid style={{paddingBottom:100}}>
                <br/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <DetalheJogadorComponent jogador={this.state.perfilAluno} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <GridDesafiosComponent Desafios={this.state.perfilAluno.Desafios} Colunas={3} IsDadoJogador={true} />
                    </Col>
                </Row>
            </Container>
        </>);
    }
}
export default PerfilComponent;