import React from 'react';
import ImgErroDefault from '../../images/erro_emoji_default_10.png';
import { Alert, Fade, Row, Col } from 'react-bootstrap';

export default function CaixaAlertaComponent(props) {

    let _img = props.Img === null ? ImgErroDefault : props.Img;

    return (<div>
        <Fade in={true}>
            <Alert variant={props.tipo}>
                <Row>
                    <Col xs={2} sm={2} md={2} lg={2} style={{paddingRight:50}}>
                        <img src={_img} alt="Erro" />
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} style={{paddingLeft:10, alignItems:"flex-start"}}>
                        <b>
                            <small>{`${props.titulo}, ${props.descricao}`}</small>
                        </b>
                    </Col>
                </Row>
            </Alert>
        </Fade>
    </div>
    );
}