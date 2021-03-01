import axios from "axios";

const instance = axios.create({
    baseURL: 'https://my-burger-builder-3a126-default-rtdb.firebaseio.com/'
})

export default instance;