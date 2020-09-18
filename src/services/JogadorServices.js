import axios from 'axios';
import APIS from '../configs/apis.js';

const ObterClassificacaoGeralJogadores = '?idOperacao=6';
const ObterJogadoresPorNome = '?idOperacao=2';
const ObterJogador = '?idOperacao=1';

class JogadorServices {

    Login(ra, senha) {
        return axios.post(APIS.JogadorAPI, {
            'ra': ra,
            'senha': senha,
            'idOperacao': '3'

        }, APIS.RequestHeaders);
    }

    ObterClassificacaoGeralJogadores(pagina, registros) {
        let filtro = `&nupagina=${pagina}&nuregistros=${registros}`;
        return axios.get(APIS.JogadorAPI + ObterClassificacaoGeralJogadores + filtro, APIS.RequestHeaders);
    }

    ObterJogadoresPorNome(nome, pagina, registros) {
        let filtro = `&nome=${nome}&nupagina=${pagina}&nuregistros=${registros}`;
        return axios.get(APIS.JogadorAPI + ObterJogadoresPorNome + filtro, APIS.RequestHeaders);
    }

    ObterJogador(id) {
        let filtro = `&id=${id}`;
        return axios.get(APIS.JogadorAPI + ObterJogador + filtro, APIS.RequestHeaders);
    }
}
export default new JogadorServices();