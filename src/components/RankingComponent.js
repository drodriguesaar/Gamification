import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import MuiFade from '@material-ui/core/Fade';
import RankingImg from '../images/podium.png';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiTypography from '@material-ui/core/Typography';
import JogadorServices from '../services/JogadorServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import CarregandoAnim from '../animations/carregando_anim.json';
import { Container, Row, Col, InputGroup, FormControl, Card, Table, Image, Button } from 'react-bootstrap';

class RankingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.fecthRankingCommand = this.fecthRanking.bind(this);
        this.handleNomeJogadorChangeCommand = this.handleNomeJogadorChange.bind(this);
        this.handleJogadorSearchCommand = this.handleJogadorSearch.bind(this);
        this.state = { ranking: [], isCarregando: true, nuPagina: 0, nuRegistros: 50, nmJogador: '' };
    }

    handleJogadorSearch(e) {
        e.preventDefault();
        if (this.state.nmJogador.length >= 4 && !this.state.isCarregando) {
            this.setState({ isCarregando: true });
            JogadorServices.ObterJogadoresPorNome(this.state.nmJogador, 0, this.state.nuRegistros)
                .then((result) => {
                    let jogadorespornome = result.data.data;
                    let newRankPorNome = [];
                    if (jogadorespornome) {
                        jogadorespornome.map((jogador) => newRankPorNome.push(jogador));
                        this.setState({
                            ranking: jogadorespornome,
                            isCarregando: false
                        });
                    }
                }).catch(() => {
                    this.setState({ isCarregando: false });
                });
        }
    }

    handleNomeJogadorChange(e) {
        e.preventDefault();
        this.setState({ nmJogador: e.target.value });

        if (e.target.value === '' && !this.state.isCarregando) {
            this.setState({ isCarregando: true, nuPagina: 0, nuRegistros: 50 });
            this.getRanking();
        }
    }

    componentDidMount() {
        this.getRanking();
    }

    getRanking() {
        JogadorServices.ObterClassificacaoGeralJogadores(this.state.nuPagina, this.state.nuRegistros)
            .then((result) => {
                let newRank = [];
                let newRankResult = result.data.data;
                newRankResult.map((player) => newRank.push(player));
                let paginaAntiga = this.state.nuPagina;
                let paginaNova = paginaAntiga + 1;
                this.setState({ isCarregando: false, ranking: newRank, nuPagina: paginaNova });
            });
    }

    fecthRanking() {
        JogadorServices.ObterClassificacaoGeralJogadores(this.state.nuPagina, this.state.nuRegistros)
            .then((result) => {
                let oldRank = this.state.ranking;
                let newRankResult = result.data.data;
                newRankResult.map((player) => oldRank.push(player));
                let paginaAntiga = this.state.nuPagina;
                let paginaNova = paginaAntiga + 1;
                this.setState({ isCarregando: false, ranking: oldRank, nuPagina: paginaNova });
            });
    }

    geraCssPodium(index) {

        let css = {
            backgroundColor: "white",
            border: "0px",
            borderRadius: "0",
            fontWeight: "normal"
        };

        switch (index) {
            case 0:
                css.backgroundColor = "#ffef9a";
                css.border = "2px solid #ffe767";
                css.fontWeight = "bold";
                break;
            case 1:
                css.backgroundColor = "#e8e8e8";
                css.border = "2px solid #ededed";
                css.fontWeight = "bold";
                break;
            case 2:
                css.backgroundColor = "#ebd1ad";
                css.border = "2px solid #e6c699";
                css.fontWeight = "bold";
                break;
            default:
                break;
        }

        return css;
    }

    renderRanking() {
        return (
            <div>
                <Table borderless={true} hover={true}>
                    <tbody>
                        {
                            this.state.ranking.map((rank, index) =>
                                <tr style={this.geraCssPodium(index)}>
                                    <td className="text-center align-middle">
                                        <Link to={`/h/app/rank/jogador/${rank.ID}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <small className="text-muted">Nível</small>
                                            <h1 className="text-dark">{rank.Nivel}</h1>
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={`/h/app/rank/jogador/${rank.ID}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <MuiAvatar src={rank.Foto} />
                                        </Link>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={`/h/app/rank/jogador/${rank.ID}`}
                                            style={{ textDecoration: 'none', color: 'black' }}>
                                            {rank.Nome}
                                        </Link>

                                    </td>
                                    <td className="text-center align-middle">
                                        <Link to={`/h/app/rank/jogador/${rank.ID}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
                                            <small className="text-muted">XP</small>
                                            <h5>{rank.Experiencia}</h5>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
    render() {
        let conteudo = this.state.isCarregando ? <Lottie animationData={CarregandoAnim} loop={true} autoplay={true} /> : this.renderRanking();
        return (
            <div style={{paddingBottom:200}}>
                <br/>
                <InfiniteScroll
                    dataLength={this.state.ranking.length}
                    next={this.fecthRankingCommand}
                    hasMore={true}
                    style={{ overflow: "hidden" }}>
                    {
                        <MuiFade in={true}>
                            <Container fluid>
                                <Row noGutters>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <Card border="primary"
                                            style={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 3px 11px 3px 4px'}}>
                                            
                                            <Card.Body>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                                                        <Image src={RankingImg} alt="Ranking" fluid={true} height={200} witdh={200} />
                                                        <MuiTypography variant="h4" className="text-dark">
                                                            Ranking Geral
                                                    </MuiTypography>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col xs={12} sm={12} md={12} lg={12}>
                                                        <InputGroup>
                                                            <FormControl
                                                                size="lg"
                                                                placeholder="pesquisa por nome"
                                                                value={this.state.nmJogador}
                                                                onChange={this.handleNomeJogadorChangeCommand} />
                                                            <InputGroup.Append >
                                                                <InputGroup>
                                                                    <Button
                                                                        variant="warning"
                                                                        onClick={this.handleJogadorSearchCommand}>
                                                                        Buscar
                                                                    </Button>
                                                                </InputGroup>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} sm={12} md={12} lg={12} >
                                                        {conteudo}
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </MuiFade>
                    }
                </InfiniteScroll>
            </div >
        );
    }
}
export default RankingComponent;