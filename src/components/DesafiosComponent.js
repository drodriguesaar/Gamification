import React from 'react';
import Lottie from 'lottie-react';
import { Container, Col, Row } from 'react-bootstrap';
import DesafioServices from '../services/DesafioServices';
import CarregandoAnim from '../animations/carregando_anim.json';
import GridDesafiosComponent from '../components/reutilizaveis/GridDesafiosComponent';

class DesafiosComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { desafios: [], isCarregando: true };
    }

    componentDidMount() {
        this.fecthDesafios();
    }

    fecthDesafios() {
        DesafioServices.ObterDesafios(0, 2000)
            .then((result) => {
                this.setState({ desafios: result.data.data, isCarregando: false });
            });
    }

    render() {
        let _conteudo = this.state.isCarregando ?
            <Lottie animationData={CarregandoAnim} loop={true} autoplay={true} /> :
            <GridDesafiosComponent Desafios={this.state.desafios} />
        return (<>
            <br/>
            <Container fluid style={{paddingBottom:100}}>
                <Row>
                    <Col lg={12} xs={12} sm={12} md={12} >
                        { _conteudo }
                    </Col>
                </Row>
            </Container>
        </>);
    }
}
export default DesafiosComponent;
