import axios from 'axios';
import Config from 'react-native-config';

// export default axios.create({ baseURL: 'http://10.32.3.61:5000/' });
export default axios.create({ baseURL: Config.BASE_URL});