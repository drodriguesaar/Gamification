import axios from 'axios';
import APIS from '../configs/apis.js';

const ObterPremios = '?idOperacao=2';

class PremioServices {

    ObterPremios(nuPagina, nuRegistros) {
        let url = `${APIS.PremioAPI}${ObterPremios}&nupagina=${nuPagina}&nuregistros=${nuRegistros}`;
        return axios.get(url, APIS.RequestHeaders);
    }
}
export default new PremioServices();