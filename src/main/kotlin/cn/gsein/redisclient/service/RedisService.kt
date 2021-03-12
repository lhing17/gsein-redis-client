package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import io.lettuce.core.*
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.resource.DefaultClientResources
import org.slf4j.LoggerFactory
import org.springframework.data.redis.connection.lettuce.LettuceConnection
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
        const val KEY_COUNT = 100L
        val clientResources: DefaultClientResources = DefaultClientResources.create()

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

    fun getKeys(key: String, database: Int, cursor: String): KeyScanCursor<String>? {
        val connection = getConnection(key, database)
        return connection.sync().scan(ScanCursor.of(cursor), ScanArgs.Builder.limit(KEY_COUNT))
    }

    /**
     * 向List中添加一条数据
     */
    fun addListValue(key: String, database: Int, redisKey: String, redisValue: String): Boolean {
        log.info("向list中添加一条数据，key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().rpush(redisKey, redisValue) > 0
    }

    /**
     * 向Set中添加一条数据
     */
    fun addSetValue(key: String, database: Int, redisKey: String, redisValue: String): Long {
        log.info("向set中添加一条数据，key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().sadd(redisKey, redisValue)
    }

    /**
     * 向hash中添加一条数据，如果数据已存在，返回false
     */
    fun addHashValue(
        key: String,
        database: Int,
        redisKey: String,
        redisHashKey: String,
        redisHashValue: String
    ): Boolean {
        log.info("向hash中添加一条数据，key: $key, database: $database, redisKey: $redisKey, redisHashKey:$redisHashKey, redisHashValue: $redisHashValue")
        val connection = getConnection(key, database)
        return connection.sync().hsetnx(redisKey, redisHashKey, redisHashValue)
    }

    fun addZsetValue(
        key: String,
        database: Int,
        redisKey: String,
        score: Double,
        redisValue: String
    ): Long {
        log.info("向zset中添加一条数据，key: $key, database: $database, redisKey: $redisKey, score:$score, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().zadd(redisKey, score, redisValue)
    }

    /**
     * 修改String类型数据的值
     */
    fun updateStringValue(key: String, database: Int, redisKey: String, redisValue: String): Boolean {
        log.info("更新String类型数据，key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return "OK" == connection.sync().set(redisKey, redisValue)
    }

    /**
     * 修改List类型数据某下标的值
     */
    fun updateListValue(key: String, database: Int, redisKey: String, redisIndex: Long, redisValue: String): Boolean {
        log.info("更新List类型数据，key: $key, database: $database, redisKey: $redisKey, redisIndex: $redisIndex, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return "OK" == connection.sync().lset(redisKey, redisIndex, redisValue)
    }

    /**
     * 修改Set类型数据值 0-值已存在 1-操作成功 2-操作异常
     */
    fun updateSetValue(
        key: String,
        database: Int,
        redisKey: String,
        oldRedisValue: String,
        newRedisValue: String
    ): Int {
        log.info("更新Set类型数据，key: $key, database: $database, redisKey: $redisKey, oldRedisValue: $oldRedisValue, newRedisValue: $newRedisValue")
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()
        val isMember = redisCommands.sismember(redisKey, newRedisValue)
        if (!isMember) {
            redisCommands.multi()
            redisCommands.srem(redisKey, oldRedisValue)
            redisCommands.sadd(redisKey, newRedisValue)
            val result = redisCommands.exec()
            return if (result.wasDiscarded()) 2 else 1
        }
        return 0
    }

    /**
     * 修改hash类型的数据
     */
    fun updateHashValue(
        key: String,
        database: Int,
        redisKey: String,
        redisHashKey: String,
        redisHashValue: String
    ): Boolean {
        log.info("更新hash中的数据，key: $key, database: $database, redisKey: $redisKey, redisHashKey:$redisHashKey, redisHashValue: $redisHashValue")
        val connection = getConnection(key, database)
        val redisCommands = connection.sync()
        val hexists = redisCommands.hexists(redisKey, redisHashKey)
        if (!hexists) return false
        return !redisCommands.hset(redisKey, redisHashKey, redisHashValue)
    }

    /**
     * 修改zset类型的数据
     */
    fun updateZsetValue(
        key: String,
        database: Int,
        redisKey: String,
        score: Double,
        redisValue: String
    ): Boolean {
        log.info("更新zset中的数据，key: $key, database: $database, redisKey: $redisKey, score:$score, redisValue: $redisValue")
        val connection = getConnection(key, database)

        // 已有数据更新返回0
        return connection.sync().zadd(redisKey, score, redisValue) == 0L
    }


    /**
     * 删除List类型指定值的一条数据
     */
    fun deleteListValue(key: String, database: Int, redisKey: String, redisValue: String): Boolean {
        log.info("删除List类型其中一条数据, key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().lrem(redisKey, 1, redisValue) == 1L
    }

    /**
     * 删除Set类型指定值的一条数据
     */
    fun deleteSetValue(key: String, database: Int, redisKey: String, redisValue: String): Boolean {
        log.info("删除Set类型其中一条数据, key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().srem(redisKey, redisValue) == 1L
    }

    /**
     * 删除Hash类型指定值的一条数据
     */
    fun deleteHashValue(key: String, database: Int, redisKey: String, redisHashKey: String): Boolean {
        log.info("删除Hash类型其中一条数据, key: $key, database: $database, redisKey: $redisKey, redisHashKey: $redisHashKey")
        val connection = getConnection(key, database)
        return connection.sync().hdel(redisKey, redisHashKey) == 1L
    }

    /**
     * 删除Zset类型指定值的一条数据
     */
    fun deleteZsetValue(key: String, database: Int, redisKey: String, redisValue: String): Boolean {
        log.info("删除Zset类型其中一条数据, key: $key, database: $database, redisKey: $redisKey, redisValue: $redisValue")
        val connection = getConnection(key, database)
        return connection.sync().zrem(redisKey, redisValue) == 1L
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

    fun editConnection(connectionData: ConnectionData, key: String) {
        connectionData.createTimestamp = redisAddressMap[key]?.createTimestamp
        redisAddressMap[key] = connectionData

        // 创建连接实体的缓存映射
        if (!connectionMap.containsKey(key)) {
            connectionMap[key] = ConcurrentHashMap()
        }

        // 将连接信息同步到本地文件，以便下次使用
        localStorageService.synchronize(redisAddressMap)

    }

    /**
     * 移除连接
     */
    fun removeConnection(key: String): Boolean {
        if (redisAddressMap.containsKey(key)) {
            redisAddressMap.remove(key)
        }
        if (connectionMap.containsKey(key)) {
            connectionMap.remove(key)
        }
        localStorageService.synchronize(redisAddressMap)
        return true
    }

    fun testConnection(connectionData: ConnectionData, database: Int = 0): Boolean {
        val builder = RedisURI.builder()
        val uri = with(builder) {
            withHost(connectionData.host)
            connectionData.port?.let { withPort(it) }
            withPassword(connectionData.password?.toCharArray())
            withDatabase(database)
            build()
        }

        val client = RedisClient.create(clientResources, uri)
        val connect = client.connect()

        // 使用后自动关闭流
        try {
            val pingResult = connect.sync().ping()
            return "PONG" == pingResult
        } finally {
            connect.closeAsync()
        }
    }


    fun sendCommand(key: String, database: Int, fullCommand: String): Any? {
        val client = buildRedisClient(key, database)
        val connection = LettuceConnection(60 * 1000L, client)
        val commandAndArgs = fullCommand.split("\\s".toRegex())
        val command = commandAndArgs[0]
        val args = commandAndArgs.asSequence().drop(1).map { it.toByteArray() }.toList().toTypedArray()
        return try {
            return when (val result = connection.execute(command, *args)) {
                is List<*> -> result.map { String(it as ByteArray) }
                is Set<*> -> result.map { String(it as ByteArray) }
                is Map<*, *> -> result.entries.associateBy ({ String(it.key as ByteArray) }, {String(it.value as ByteArray)})
                is ByteArray -> String(result)
                else -> result
            }
        } catch (e: Exception) {
            if (e is java.lang.IllegalArgumentException) {
                return "ERR unknown command '$command'"
            }
            when (e.cause) {
                is RedisCommandExecutionException -> (e.cause as RedisCommandExecutionException).message
                else -> e.message
            }
        }
    }

    private fun getConnection(uuid: String, database: Int): StatefulRedisConnection<String, String> {
        val connection = connectionMap[uuid]?.get(database)
        return if (connection != null && connection.isOpen) {
            connection
        } else {
            val client = buildRedisClient(uuid, database)
            client.connect()
        }
    }

    private fun buildRedisClient(uuid: String, database: Int): RedisClient {
        val connectionData = redisAddressMap[uuid]
        val builder = RedisURI.builder()
        val uri = with(builder) {
            withHost(connectionData?.host)
            connectionData?.port?.let { withPort(it) }
            withPassword(connectionData?.password?.toCharArray())
            withDatabase(database)
            build()
        }

        return RedisClient.create(clientResources, uri)
    }

    private fun nextUuid(): String {
        var uuid: String
        do {
            uuid = UUID.randomUUID().toString()
        } while (redisAddressMap.containsKey(uuid))
        return uuid
    }


}