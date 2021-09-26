import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.bido.live/api/v1/'
});

