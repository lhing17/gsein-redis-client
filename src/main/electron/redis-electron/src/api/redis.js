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

export const updateStringValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/update-string-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})

export const updateKey = (key, database, redisKey, newRedisKey) => axios({
  url: baseUrl + 'redis/update-key',
  method: 'post',
  params: {key, database, redisKey, newRedisKey}
})

export const updateTtl = (key, database, redisKey, ttl) => axios({
  url: baseUrl + 'redis/update-ttl',
  method: 'post',
  params: {key, database, redisKey, ttl}
})

export const deleteKey = (key, database, redisKey) => axios({
  url: baseUrl + 'redis/delete-key',
  method: 'post',
  params: {key, database, redisKey}
})

export const addListValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/add-list-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})

export const updateListValue = (key, database, redisKey, redisIndex, redisValue) => axios({
  url: baseUrl + 'redis/update-list-value',
  method: 'post',
  params: {key, database, redisKey, redisIndex, redisValue}
})

export const deleteListValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/delete-list-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})
