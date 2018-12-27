import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://my-burger-de0b5.firebaseio.com/'
})

export default instance