import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://access-code-app.firebaseio.com/',
})

export default instance;