package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import io.lettuce.core.RedisClient
import io.lettuce.core.RedisURI
import io.lettuce.core.api.StatefulRedisConnection
import org.slf4j.LoggerFactory
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
    private val log = LoggerFactory.getLogger(this.javaClass)

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

    fun getTtl(key: String, database: Int, redisKey: String): Long {
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()
        return redisCommands.ttl(redisKey)
    }

    fun getType(key: String, database: Int, redisKey: String): String {
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()
        return redisCommands.type(redisKey)
    }

    fun getValue(key: String, database: Int, redisKey: String): Any {
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()

        return when (redisCommands.type(redisKey)) {
            "string" -> {
                redisCommands.get(redisKey)
            }
            "hash" -> {
                val map = redisCommands.hgetall(redisKey)
                map.entries.map { mapOf("key" to it.key, "value" to it.value) }
            }
            "list" -> {
                val list = redisCommands.lrange(redisKey, 0, -1)
                list.map { mapOf("value" to it) }
            }
            "set" -> {
                val set = redisCommands.smembers(redisKey)
                set.map { mapOf("value" to it) }
            }
            "zset" -> {
                val list = redisCommands.zrangeWithScores(redisKey, 0, -1)
                list.map { mapOf("score" to it.score, "value" to it.value) }
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

    /**
     * 修改String类型数据的值
     */
    fun updateStringValue(key: String, database: Int, redisKey: String, redisValue: String): String {
        log.info("更新String类型数据，key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().set(redisKey, redisValue)
    }

    /**
     * 修改key的过期时间
     */
    fun updateTtl(key: String, database: Int, redisKey: String, ttl: Long): Boolean {
        log.info("设定key的过期时间: $key, database: $database, redisKey: $redisKey, ttl: $ttl")
        val connection = getConnection(key, database)
        return connection.sync().expire(redisKey, ttl)
    }

    /**
     * 修改key的名称
     */
    fun updateKey(key: String, database: Int, redisKey: String, newRedisKey: String): Boolean {
        log.info("对redis数据进行重命名，key: $key, database: $database, redisKey: $redisKey, newRedisKey: $newRedisKey")
        val connection = getConnection(key, database)
        return connection.sync().renamenx(redisKey, newRedisKey)
    }

    /**
     * 删除key
     */
    fun deleteKey(key: String, database: Int, redisKey: String): Boolean {
        log.info("删除redis的key，key: $key, database: $database, redisKey: $redisKey")
        val connection = getConnection(key, database)
        return connection.sync().del(redisKey) == 1L
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