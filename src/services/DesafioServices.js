import axios from 'axios';
import APIS from '../configs/apis.js';

const ObterDesafios = '?idOperacao=1';
const ObterDesafiosJogador = '?idOperacao=2';

class DesafioServices {

   ObterDesafios(nuPagina, nuRegistros) {
        let urlBackEnd = `${APIS.DesafioAPI}${ObterDesafios}&nupagina=${nuPagina}&nuregistros=${nuRegistros}`;
        return axios.get(urlBackEnd, APIS.RequestHeaders);
    }

    ObterDesafiosJogador(idJogador) {        
        let urlBackEnd = `${APIS.DesafioAPI}${ObterDesafiosJogador}&id=${idJogador}`;
        return axios.get(urlBackEnd, APIS.RequestHeaders);
    }
}
export default new DesafioServices();


