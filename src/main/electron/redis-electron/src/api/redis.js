const axios = require('axios')

export const newConnection = () => axios({
  url: '/api/redis/new-connection',
  method: 'post',
  params: {

  }
})
