import axios from 'axios';
const instance = axios.create({baseURL:'https://react-my-burger-f4d3d.firebaseio.com/'})

export default instance;