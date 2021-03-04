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

export const addSetValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/add-set-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})

export const addHashValue = (key, database, redisKey, redisHashKey, redisHashValue) => axios({
  url: baseUrl + 'redis/add-hash-value',
  method: 'post',
  params: {key, database, redisKey, redisHashKey, redisHashValue}
})

export const addZsetValue = (key, database, redisKey, score, redisValue) => axios({
  url: baseUrl + 'redis/add-zset-value',
  method: 'post',
  params: {key, database, redisKey, score, redisValue}
})

export const updateListValue = (key, database, redisKey, redisIndex, redisValue) => axios({
  url: baseUrl + 'redis/update-list-value',
  method: 'post',
  params: {key, database, redisKey, redisIndex, redisValue}
})

export const updateSetValue = (key, database, redisKey, oldRedisValue, newRedisValue) => axios({
  url: baseUrl + 'redis/update-set-value',
  method: 'post',
  params: {key, database, redisKey, oldRedisValue, newRedisValue}
})


export const updateHashValue = (key, database, redisKey, redisHashKey, redisHashValue) => axios({
  url: baseUrl + 'redis/update-hash-value',
  method: 'post',
  params: {key, database, redisKey, redisHashKey, redisHashValue}
})


export const updateZsetValue = (key, database, redisKey, score, redisValue) => axios({
  url: baseUrl + 'redis/update-zset-value',
  method: 'post',
  params: {key, database, redisKey, score, redisValue}
})


export const deleteListValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/delete-list-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})

export const deleteSetValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/delete-set-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})

export const deleteHashValue = (key, database, redisKey, redisHashKey) => axios({
  url: baseUrl + 'redis/delete-hash-value',
  method: 'post',
  params: {key, database, redisKey, redisHashKey}
})

export const deleteZsetValue = (key, database, redisKey, redisValue) => axios({
  url: baseUrl + 'redis/delete-zset-value',
  method: 'post',
  params: {key, database, redisKey, redisValue}
})
