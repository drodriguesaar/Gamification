import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import ChatImg from '../images/chat.png';
import MuiFade from '@material-ui/core/Fade';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CarregandoAnim from '../animations/carregando_anim.json';
import NotificacaoAnim from '../animations/notificacao_anim.json';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemAvatar from '@material-ui/core/ListItemAvatar';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiChatIcon from '@material-ui/icons/Chat';


class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usuariosOnline: [], HubChat: {} };
    }
    componentDidMount() {
        this.fetchUsuariosOnline();
    }

    fetchUsuariosOnline() {
        let novoArrUsuario = [];
        for (let usuario = 0; usuario < 10; usuario++) {
            novoArrUsuario.push({
                nome: `Fulano ${usuario}`,
                id: usuario,
                isOnline: ((usuario % 2) === 0),
                foto: 'https://tinyurl.com/y23lhl35'
            });
        }

        this.setState({ usuariosOnline: novoArrUsuario });
    }

    renderGridUsuarios() {
        let _content = null;
        _content =
            <MuiList>
                {
                    this.state.usuariosOnline.map((usuario) =>
                        <MuiListItem divider={true} key={usuario.id}>
                            <MuiListItemAvatar>
                                <MuiAvatar src={usuario.foto} />
                            </MuiListItemAvatar>
                            <MuiListItemText>
                                <Link to={`/h/app/chat/pessoa/${usuario.id}`}
                                    className={usuario.isOnline ? "text-success" : "text-muted"}
                                    style={{ textDecoration: 'none', color: 'black' }}>
                                    <b>{usuario.nome}</b>
                                    <br />
                                    <small>
                                        {usuario.isOnline ? 'Online' : 'Offline'}
                                    </small>
                                </Link>
                            </MuiListItemText>
                            <MuiListItemIcon>
                                <MuiChatIcon />
                            </MuiListItemIcon>
                            <MuiListItemIcon>
                                {/* Exibir somente se tiver notificação pendente */}
                                <div>
                                    <Lottie animationData={NotificacaoAnim}
                                        autoPlay={true}
                                        loop={true} />
                                </div>
                            </MuiListItemIcon>
                        </MuiListItem>)
                }
            </MuiList>
        return _content;
    }

    render() {
        return (<div style={{paddingBottom:160}}>
            <br />
            <MuiFade in={true}>
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Card
                                border="primary"
                                style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 3px 11px 3px 4px' }}>
                                <Card.Header className="text-center text-dark">
                                    <img src={ChatImg} alt="chat" height={50} witdh={50} />
                                    <h3>Conversas</h3>
                                </Card.Header>
                                <Card.Body>
                                    {this.renderGridUsuarios()}
                                </Card.Body>
                                <Card.Footer>

                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MuiFade>
        </div>)
    }
}
export default ChatComponent;