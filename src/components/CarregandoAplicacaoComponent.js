import React from 'react';
import Lottie from 'lottie-react';
import CarregandoAnim from '../animations/carregando_anim.json';
import { Container, Row, Col, Fade } from 'react-bootstrap';
import Session from 'store2';
import Chaves from '../chaves.js';
import PassaporteServices from '../services/PassaporteServices';

class CarregandoAplicacaoComponent extends React.Component {

    componentDidMount() {
        const {  history } = this.props;

        let hasApi = Session.has(Chaves.GameApiStoreKey);
        let hasUsuario = Session.has(Chaves.UsuarioStoreKey);

        if (hasApi && hasUsuario) {
            history.push('/l');
            return;
        }

        PassaporteServices.AutorizarApp()
            .then((result) => {
                Session.set(Chaves.GameApiStoreKey, result.data.data.Credencial);
                history.push('/l');
            })
            .catch((e) => {
                history.push('/n');
            });

    }

    render() {
        return (<div>
            <Fade in={true} >
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Lottie style={{ paddingBottom: 0, marginBottom: 0 }}
                                animationData={CarregandoAnim}
                                height={50}
                                width={50}
                                loop={true}
                                autoplay={true} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} style={{ textAlign: "center" }} >
                            <h5 className="text-warning">Carregando...</h5>
                        </Col>
                    </Row>
                </Container>
            </Fade>
            
      
        </div>
        );
    }
}
export default CarregandoAplicacaoComponent;