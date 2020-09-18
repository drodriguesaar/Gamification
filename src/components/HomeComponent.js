import React from 'react';
import Session from 'store2';
import Chaves from '../chaves';
import Crypto from 'crypto-js';
import { Col, Container, Row } from 'react-bootstrap';
import Navegacao from './reutilizaveis/NavegacaoComponent';
import { Route, Switch } from 'react-router-dom';
import PerfilComponent from '../components/PerfilComponent';
import RankingComponent from '../components/RankingComponent';
import JogadorComponent from './JogadorComponent';
import DesafiosComponent from './DesafiosComponent';
import PremiosComponent from './PremiosComponent';
import ChatComponent from './ChatComponent';
import ConversaComponent from './ConversaComponent';

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { aluno: {} };
    }

    isLogado() {
        let alunoDataBytes = Session.get(Chaves.UsuarioStoreKey);
        return alunoDataBytes;
    }


    componentDidMount() {
        const { history } = this.props;
        let logado = this.isLogado();
        if (!logado) {

            history.push('/l');
            return;
        }
        let alunoDataBytes = Crypto.AES.decrypt(Session.get(Chaves.UsuarioStoreKey), Chaves.Sal);
        let alunoJSON = JSON.parse(alunoDataBytes.toString(Crypto.enc.Utf8));
        this.setState({ aluno: alunoJSON.data });
    }

    render() {
        

        return (<div className="body-light" >
            <Container >
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} id="main-body">
                        <Switch>
                            <Route path="/h/app/chat/pessoa/:ID" component={ConversaComponent}/>
                            <Route path="/h/app/rank/jogador/:ID" component={JogadorComponent}/>
                            <Route path="/h/app/chat" component={ChatComponent} />
                            <Route path="/h/app/premios" component={PremiosComponent} />
                            <Route path="/h/app/desafios" component={DesafiosComponent} />
                            <Route path="/h/app/ranking" component={RankingComponent} />
                            <Route path="/h/app/perfil" component={PerfilComponent} />
                            <Route path="/h" component={RankingComponent} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Navegacao fotoAluno={this.state.aluno.Foto} />
        </div>
        );
    }
}
export default HomeComponent;