import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AcessoNegadoAnim from '../animations/acesso_negado_anim.json';

class AppNaoAutorizadoComponent extends React.Component {
    render() {
        return (<div>
            <Container fluid>
                <Row>
                    <Col sm={12} xs={12} md={12} lg={12} className="text-center">
                        <Lottie 
                            animationData={AcessoNegadoAnim} 
                            autoPlay={true} 
                            loop={false} />
                    </Col>
                </Row>
                <Row>
                    
                    <Col sm={12} xs={12} md={12} lg={12} 
                        className="text-center">
                        <h4 className="text-warning">
                            Não foi possível autenticar o aplicativo 
                        </h4>
                    </Col>
                    
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Link to="/">
                            <Button block
                                variant="outline-warning"
                                size="lg"
                                type="button">
                                {'>_ Tentar Novamente'}
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}
export default AppNaoAutorizadoComponent;