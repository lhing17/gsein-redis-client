const axios = require('axios')

const baseUrl = 'http://localhost:8081/'

export const newConnection = (form) => axios({
  url: baseUrl + 'redis/new-connection',
  method: 'post',
  params: form
})

export const listAddresses = () => axios({
  url: baseUrl + 'redis/list-addresses',
  method: 'get'
})

export const getInfo = (key) => axios({
  url: baseUrl + 'redis/get-info?key=' + key,
  method: 'get'
})
