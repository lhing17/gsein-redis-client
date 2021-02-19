package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import io.lettuce.core.RedisClient
import io.lettuce.core.RedisURI
import io.lettuce.core.api.StatefulRedisConnection
import org.springframework.stereotype.Service

/**
 * @author G. Seinfeld
 * @since 2021/02/19
 */
@Service
class RedisService {
    fun initConnection(connectionData: ConnectionData): StatefulRedisConnection<String, String> {
        val builder = RedisURI.builder()
        val uri = with(builder) {
            withHost(connectionData.host)
            withPort(connectionData.port)
            withPassword(connectionData.password.toCharArray())
            withDatabase(connectionData.database)
            build()
        }

        val client = RedisClient.create(uri)
        return client.connect()
    }
}