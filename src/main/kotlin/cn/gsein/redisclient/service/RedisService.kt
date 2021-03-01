package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import io.lettuce.core.RedisClient
import io.lettuce.core.RedisURI
import io.lettuce.core.api.StatefulRedisConnection
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import javax.annotation.Resource

/**
 * @author G. Seinfeld
 * @since 2021/02/19
 */
@Service
class RedisService {
    companion object {
        var connectionMap: MutableMap<String, MutableMap<Int, StatefulRedisConnection<String, String>>> =
            ConcurrentHashMap()

        var redisAddressMap: MutableMap<String, ConnectionData> = ConcurrentHashMap()
    }

    @Resource
    lateinit var localStorageService: LocalStorageService

    /**
     * 获取redis连接信息
     */
    fun getInfo(key: String): Map<String, Map<String, String>> {
        val map = LinkedHashMap<String, MutableMap<String, String>>()
        val connection = getConnection(key, 0)
        val info = connection.sync().info()
        val lines = info.lines()
        var currentKey = ""
        for (line in lines) {
            if (line.startsWith("#")) {
                currentKey = line.trim('#', ' ')
            } else if (line.contains(':')) {
                val split = line.split(":")
                if (!map.containsKey(currentKey)) {
                    map[currentKey] = LinkedHashMap()
                }
                val k = split[0]
                val v = split[1]
                map[currentKey]?.set(k, v)
            }
        }
        return map
    }

    fun getValue(key: String, database: Int, redisKey: String): Any {
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()

        return when (redisCommands.type(redisKey)) {
            "string" -> {
                redisCommands.get(redisKey)
            }
            "hash" -> {
                redisCommands.hgetall(redisKey)
            }
            "list" -> {
                redisCommands.lrange(redisKey, 0, -1)
            }
            "set" -> {
                redisCommands.smembers(redisKey)
            }
            "zset" -> {
                redisCommands.zrangeWithScores(redisKey, 0, -1)
            }
            else -> {
                ""
            }
        }
    }

    fun getKeys(key: String, database: Int): List<String> {
        val connection = getConnection(key, database)
        return connection.sync().keys("*")
    }

    fun initAddressMap() {
        redisAddressMap = ConcurrentHashMap(localStorageService.init())
    }

    fun listAddresses(): MutableMap<String, ConnectionData> {
        return redisAddressMap
    }

    fun registerNewRedisAddress(connectionData: ConnectionData) {
        var exists = false
        var key = ""

        // 覆盖原有的连接信息
        for (entry in redisAddressMap) {
            if (connectionData == entry.value) {
                redisAddressMap[entry.key] = connectionData
                exists = true
                key = entry.key
                break
            }
        }

        // 添加新的连接信息
        if (!exists) {
            val uuid = nextUuid()
            redisAddressMap[uuid] = connectionData
            key = uuid
        }

        // 创建连接实体的缓存映射
        if (!connectionMap.containsKey(key)) {
            connectionMap[key] = ConcurrentHashMap()
        }

        // 将连接信息同步到本地文件，以便下次使用
        localStorageService.synchronize(redisAddressMap)
    }

    private fun getConnection(uuid: String, database: Int): StatefulRedisConnection<String, String> {
        val connection = connectionMap[uuid]?.get(database)
        return if (connection != null && connection.isOpen) {
            connection
        } else {
            val connectionData = redisAddressMap[uuid]
            val builder = RedisURI.builder()
            val uri = with(builder) {
                withHost(connectionData?.host)
                connectionData?.port?.let { withPort(it) }
                withPassword(connectionData?.password?.toCharArray())
                withDatabase(database)
                build()
            }

            val client = RedisClient.create(uri)
            client.connect()
        }
    }

    private fun nextUuid(): String {
        var uuid: String
        do {
            uuid = UUID.randomUUID().toString()
        } while (redisAddressMap.containsKey(uuid))
        return uuid
    }

}