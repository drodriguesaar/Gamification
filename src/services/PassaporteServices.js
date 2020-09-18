import Chaves from '../chaves.js';
import Axios from 'axios';

class PassaporteServices {
    AutorizarApp() {
        return Axios.post(Chaves.PassaporteApi, {
            'idoperacao': '1',
            'clientkey': Chaves.PassaporteToken
        });
    }
}
export default new PassaporteServices();