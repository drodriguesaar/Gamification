import Chaves from '../chaves.js';
import Session from 'store2';

export default {
    JogadorAPI: `${Chaves.GameApi}Jogador`,
    DesafioAPI: `${Chaves.GameApi}Desafio`,
    MidiaAPI: `${Chaves.GameApi}Media`,
    PremioAPI: `${Chaves.GameApi}Premio`,
    RequestHeaders: {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': '*/*',
            'mode': 'cors',
            'Authorization': `Bearer ${Session.get(Chaves.GameApiStoreKey)}`,
            'Access-Control-Allow-Methods': "*",
            'Access-Control-Allow-Origins': "*",
            'Access-Control-Allow-Headers': "*"
        }
    }
}