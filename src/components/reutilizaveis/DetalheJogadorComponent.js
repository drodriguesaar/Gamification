import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import MuiAvatar from '@material-ui/core/Avatar';
import MuiFade from '@material-ui/core/Fade';

export default function DetalheJogadorComponent(props) {
    return (<>
    <MuiFade in={true}>
        <Card border="primary" 
              style={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 3px 11px 3px 4px'}}>
            <Card.Body className="text-dark">
                <Row>
                    <Col />
                    <Col>
                        <MuiAvatar src={props.jogador.Foto} style={{ height: 100, width: 100 }} />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="text-center align-middle">
                        <h3>{props.jogador.Nome}</h3>
                        Curso: {props.jogador.Curso}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                        <h1 style={{ fontSize: "4.5rem", color: "purple" }}>
                            <small class="text-muted">lv</small>&nbsp;
                            {props.jogador.Nivel}
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} className="text-center">
                        <h1>
                            {props.jogador.Experiencia}
                            <small class="text-muted">pts</small>
                        </h1>
                        <small class="text-muted">Experiência</small>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="text-center">
                        <h1>
                            <small class="text-muted">$</small>
                            {props.jogador.Coins}
                        </h1>
                        <small class="text-muted">Moedas</small>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </MuiFade>
    </>);

}