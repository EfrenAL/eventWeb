import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://bquini-api.herokuapp.com/'
  //baseURL: 'http://localhost:3000/'
})

 //instance.defaults.headers.common['Auth'] = ''
 instance.defaults.headers.common['Authorization'] = 'AUTH';


export default instance