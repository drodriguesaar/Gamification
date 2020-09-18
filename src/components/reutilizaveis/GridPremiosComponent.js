import React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import MuiGridListTile from '@material-ui/core/GridListTile';
import MuiGridListTileBar from '@material-ui/core/GridListTileBar';
import MuiFade from '@material-ui/core/Fade';
import SemResultadoAnim from '../../animations/sem_conteudo_anim.json';
import { Card, Image, Row, Col } from 'react-bootstrap';
import PremiosImg from '../../images/premios_badge.png';
import Lottie from 'lottie-react';

export default function GridPremiosComponent(props) {
    let _colunas = (props.Colunas !== undefined && props.Colunas !== 0) ? props.Coluna : 3;
    let _gridContent = ((props.Premios !== undefined && props.Premios !== null) && props.Premios.length > 0) ?

        <MuiGridList cols={_colunas}>
            {props.Premios.map((premio) =>
                <MuiGridListTile>
                    <img src='https://tinyurl.com/yxslyj92' alt="desafio"></img>
                    <MuiGridListTileBar
                        key={premio.ID}
                        title={premio.Nome}
                        subtitle={premio.Descricao}>
                    </MuiGridListTileBar>
                </MuiGridListTile>)
            }
        </MuiGridList>
        :
        <div className="text-center">
            <Lottie animationData={SemResultadoAnim} autoPlay={true} loop={false} />
            <span className="text-dark">hum...está meio vazio por aqui.....</span>
        </div>

    return (<>
    <MuiFade in={true}>
        <Card border="primary"
        style={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 3px 11px 3px 4px'}}>
            <Card.Header className="text-center text-dark">
                <Image src={PremiosImg} alt="premios" height={36} widht={36} />
                <h3>Prêmios disponíveis</h3>
            </Card.Header>
            <Card.Body className="text-dark">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {_gridContent}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer />
        </Card>
    </MuiFade>
    </>);
};