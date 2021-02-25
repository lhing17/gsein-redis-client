const axios = require('axios')

const baseUrl = "http://localhost:8081/"

export const newConnection = () => axios({
  url: baseUrl + 'redis/new-connection',
  method: 'post',
  params: {

  }
})
