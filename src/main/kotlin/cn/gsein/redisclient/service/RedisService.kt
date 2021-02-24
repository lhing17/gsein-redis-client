package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import io.lettuce.core.RedisClient
import io.lettuce.core.RedisURI
import io.lettuce.core.api.StatefulRedisConnection

/**
 * @author G. Seinfeld
 * @since 2021/02/19
 */
class RedisService(private val connectionData: ConnectionData) {
    var connection: StatefulRedisConnection<String, String> = createConnection(connectionData)
        get() {
            return if (field.isOpen) field
            else {
                field.close()
                field = createConnection(connectionData)
                return field
            }
        }


    private fun createConnection(connectionData: ConnectionData): StatefulRedisConnection<String, String> {
        val builder = RedisURI.builder()
        val uri = with(builder) {
            withHost(connectionData.host)
            connectionData.port?.let { withPort(it) }
            withPassword(connectionData.password?.toCharArray())
            connectionData.database?.let { withDatabase(it) }
            build()
        }

        val client = RedisClient.create(uri)
        return client.connect()
    }

    fun info(): Map<String, String> {
        val info = connection.sync().info()
        return info.split("\n").filter {
            it.contains(":")
        }.map {
            it.split(":")
        }.associateBy({ it[0] }, { it[1].trim() })
    }
}