import React from 'react';
import Lottie from 'lottie-react';
import JogadorServices from '../services/JogadorServices';
import CarregandoAnim from '../animations/carregando_anim.json';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GridDesafiosComponent from '../components/reutilizaveis/GridDesafiosComponent';
import DetalheJogadorComponent from '../components/reutilizaveis/DetalheJogadorComponent';

class JogadorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { jogador: {}, isCarregando: false };
        this.handleVoltarCommand = this.handleVoltar.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        let idJogador = params.ID;

        this.setState({ isCarregando: true });

        JogadorServices.ObterJogador(idJogador)
            .then((result) => {
                let jogadorResult = result.data;
                this.setState({ jogador: jogadorResult.data, isCarregando: false });
            }).catch((e) => {
                console.log(e);
                this.setState({ isCarregando: false, jogador: {} })
            });
    }

    handleVoltar() {
        const { history } = this.props;
        history.push('/h/app/ranking');
    }

    render() {

        let _content = this.state.isCarregando ?
            <Lottie
                animationData={CarregandoAnim}
                loop={true}
                autoPlay={true} /> :
            <Container fluid style={{ paddingTop: 30, overflowY: "hidden" }}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {<DetalheJogadorComponent jogador={this.state.jogador}/>}
                        <br />
                        {<GridDesafiosComponent Desafios={this.state.jogador.Desafios} Colunas={2} />}      
                    </Col>
                </Row>
                <br />
                <Row style={{ paddingBottom: 100 }}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Button
                            block
                            size="lg"
                            variant="outline-warning"
                            onClick={this.handleVoltarCommand}>
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Container>;
        return (<>
            { _content}
        </>
        );
    }
}
export default JogadorComponent;