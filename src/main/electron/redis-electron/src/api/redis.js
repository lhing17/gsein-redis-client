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

export const getKeys = (key, database) => axios({
  url: baseUrl + 'redis/get-keys?key=' + key + '&database=' + database,
  method: 'get'
})

export const getValueByKey = (key, database, redisKey) => axios({
  url: baseUrl + 'redis/get-value?key=' + key + '&database=' + database + '&redisKey=' + redisKey,
  method: 'get'
})
