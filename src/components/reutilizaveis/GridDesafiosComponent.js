import React from 'react';
import Lottie from 'lottie-react';
import MuiGridList from '@material-ui/core/GridList';
import MuiGridListTile from '@material-ui/core/GridListTile';
import MuiGridListTileBar from '@material-ui/core/GridListTileBar';
import SemResultadoAnim from '../../animations/sem_conteudo_anim.json';
import { Row, Col, Card, Image } from 'react-bootstrap';
import DesafioImg from '../../images/desafios_badge.png';
import MuiFade from '@material-ui/core/Fade';

export default function GridDesafiosComponent(props) {

    let _colunas = (props.Colunas !== undefined && props.Colunas !== 0) ? props.Coluna : 3;
    let _textoTitulo = (props.IsDadoJogador !== undefined && props.IsDadoJogador === true ? "Meus Desafios" : "Desafios Disponíveis");
    let _gridContent = (props.Desafios !== undefined && props.Desafios.length > 0) ?
        <MuiGridList cols={_colunas}>
            {props.Desafios.map((desafio) =>
                <MuiGridListTile>
                    <Image src={DesafioImg} alt="desafio" height={118} width={118} />
                    <MuiGridListTileBar
                        key={desafio.ID}
                        title={desafio.Nome}
                        subtitle={desafio.Descricao}>
                    </MuiGridListTileBar>
                </MuiGridListTile>)
            }
        </MuiGridList>
        :
        <div className="text-center">
            <Lottie animationData={SemResultadoAnim} autoPlay={true} loop={false} />
            <span className="text-dark">hum...está meio vazio por aqui.....</span>
        </div>

    return <>
    <MuiFade in={true}>
        <Card border="primary"
        style={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 3px 11px 3px 4px'}}>
            <Card.Header className="text-dark text-center">
                <Image src={DesafioImg} alt="desafios" fluid rounded height={48} width={48} /><br />
                <h3>{_textoTitulo}</h3>
            </Card.Header>
            <Card.Body className="text-dark">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                        {_gridContent}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer />
        </Card>
    </MuiFade>
    </>;
};