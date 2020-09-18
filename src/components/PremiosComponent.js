import React from 'react';
import Lottie from 'lottie-react';
import { Container, Row, Col } from 'react-bootstrap';
import PremioServices from '../services/PremioServices';
import CarregandoAnim from '../animations/carregando_anim.json';
import GridPremiosComponent from '../components/reutilizaveis/GridPremiosComponent';

class PremiosComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { premios: [], isCarregando: true };
    }

    componentDidMount() {
        this.fetchPremios();
    }

    fetchPremios() {
        PremioServices
            .ObterPremios(0, 1000)
            .then((result) => {
                let premiosResult = result.data.data;
                this.setState({ premios: premiosResult, isCarregando: false });
        });
    }

    render() {
        let _conteudo = this.state.isCarregando ?
            <Lottie animationData={CarregandoAnim} loop={true} autoPlay={true} />
            :
            <GridPremiosComponent Premios={this.state.premios} Colunas={1} />;

        return (<>
            <br/>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                        {_conteudo}
                    </Col>
                </Row>
            </Container>
        </>);
    }
}
export default PremiosComponent;