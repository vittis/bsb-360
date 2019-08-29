import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.0.2.2:3030/api',
});
