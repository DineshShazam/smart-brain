import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:4041',
    method:'post',
    headers:{'Content-Type': 'application/json'}
})

export default instance