package cn.gsein.redisclient.controller

import cn.gsein.redisclient.data.AjaxResult
import cn.gsein.redisclient.data.ConnectionData
import cn.gsein.redisclient.service.RedisService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.annotation.Resource

/**
 * @author G. Seinfeld
 * @since 2021/02/23
 */
@RestController
@RequestMapping("/redis")
class RedisController {

    @Resource
    lateinit var redisService: RedisService

    @GetMapping
    fun ensureConnected(): String {
        return "ok"
    }

    @PostMapping("/new-connection")
    fun newConnection(connectionData: ConnectionData): String {
        if (connectionData.host == null) {
            connectionData.host = "127.0.0.1"
        }
        if (connectionData.port == null) {
            connectionData.port = 6379
        }
        redisService.registerNewRedisAddress(connectionData)
        return "abcd"
    }

    @GetMapping("/list-addresses")
    fun listAddresses(): AjaxResult<List<Map<String, String>>> {
        val addressMap = redisService.listAddresses()
        val list = addressMap.entries.map {
            val map = HashMap<String, String>()
            map["host"] = it.value.host.toString()
            map["port"] = it.value.port.toString()
            map["key"] = it.key
            map["separator"] = it.value.separator.toString()
            map["username"] = it.value.username.toString()
            map
        }
        return AjaxResult.ok(list)
    }

    @GetMapping("/get-info")
    fun getInfo(key: String): AjaxResult<Map<String, Map<String, String>>> {
        val info = redisService.getInfo(key)
        return AjaxResult.ok(info)
    }

    @GetMapping("/get-keys")
    fun getKeys(key: String, database: Int): AjaxResult<List<String>> {
        val keys = redisService.getKeys(key, database)
        return AjaxResult.ok(keys)
    }

    @GetMapping("/get-value")
    fun getValue(key: String, database: Int, redisKey: String): AjaxResult<Any> {
        val info = HashMap<String, Any>()
        info["type"] = redisService.getType(key, database, redisKey)
        info["value"] = redisService.getValue(key, database, redisKey)
        info["key"] = redisKey
        info["ttl"] = redisService.getTtl(key, database, redisKey)

        return AjaxResult.ok(info)
    }

    @PostMapping("/update-string-value")
    fun updateStringValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        val result = redisService.updateStringValue(key, database, redisKey, redisValue)
        return buildAjaxResult(result)
    }

    @PostMapping("/update-key")
    fun updateKey(key: String, database: Int, redisKey: String, newRedisKey: String): AjaxResult<Any?> {
        val result = redisService.updateKey(key, database, redisKey, newRedisKey)
        return buildAjaxResult(result)
    }

    @PostMapping("/update-ttl")
    fun updateTtl(key: String, database: Int, redisKey: String, ttl: Long): AjaxResult<Any?> {
        val result = redisService.updateTtl(key, database, redisKey, ttl)
        return if (result) AjaxResult.ok() else AjaxResult.error("操作异常")
    }

    @PostMapping("/delete-key")
    fun deleteKey(key: String, database: Int, redisKey: String): AjaxResult<Any?> {
        val result = redisService.deleteKey(key, database, redisKey)
        return buildAjaxResult(result)
    }

    @PostMapping("/add-list-value")
    fun addListValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        val result = redisService.addListValue(key, database, redisKey, redisValue)
        return buildAjaxResult(result)
    }

    @PostMapping("/add-set-value")
    fun addSetValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        return when (redisService.addSetValue(key, database, redisKey, redisValue)) {
            0L -> AjaxResult.error("值已存在")
            1L -> AjaxResult.ok()
            else -> AjaxResult.error("操作异常")
        }
    }

    @PostMapping("/add-hash-value")
    fun addHashValue(
        key: String,
        database: Int,
        redisKey: String,
        redisHashKey: String,
        redisHashValue: String
    ): AjaxResult<Any?> {
        return when (redisService.addHashValue(key, database, redisKey, redisHashKey, redisHashValue)) {
            false -> AjaxResult.error("值已存在")
            true -> AjaxResult.ok()
        }
    }

    @PostMapping("/add-zset-value")
    fun addZsetValue(
        key: String,
        database: Int,
        redisKey: String,
        score: Double,
        redisValue: String
    ): AjaxResult<Any?> {
        return when (redisService.addZsetValue(key, database, redisKey, score, redisValue)) {
            0L -> AjaxResult.error("值已存在，已更新分值")
            1L -> AjaxResult.ok()
            else -> AjaxResult.error("操作异常")
        }
    }

    @PostMapping("/update-list-value")
    fun updateListValue(
        key: String,
        database: Int,
        redisKey: String,
        redisIndex: Long,
        redisValue: String
    ): AjaxResult<Any?> {
        val result = redisService.updateListValue(key, database, redisKey, redisIndex, redisValue)
        return buildAjaxResult(result)
    }

    @PostMapping("/update-set-value")
    fun updateSetValue(
        key: String,
        database: Int,
        redisKey: String,
        oldRedisValue: String,
        newRedisValue: String
    ): AjaxResult<Any?> {
        return buildAjaxResult(redisService.updateSetValue(key, database, redisKey, oldRedisValue, newRedisValue))
    }

    @PostMapping("/update-hash-value")
    fun updateHashValue(
        key: String,
        database: Int,
        redisKey: String,
        redisHashKey: String,
        redisHashValue: String
    ): AjaxResult<Any?> {
        return buildAjaxResult(redisService.updateHashValue(key, database, redisKey, redisHashKey, redisHashValue))
    }

    @PostMapping("/update-zset-value")
    fun updateZsetValue(
        key: String,
        database: Int,
        redisKey: String,
        score: Double,
        redisValue: String
    ): AjaxResult<Any?> {
        return buildAjaxResult(redisService.updateZsetValue(key, database, redisKey, score, redisValue))
    }

    @PostMapping("/delete-list-value")
    fun deleteListValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        val result = redisService.deleteListValue(key, database, redisKey, redisValue)
        return buildAjaxResult(result)
    }

    @PostMapping("/delete-set-value")
    fun deleteSetValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        return buildAjaxResult(redisService.deleteSetValue(key, database, redisKey, redisValue))
    }

    @PostMapping("/delete-hash-value")
    fun deleteHashValue(key: String, database: Int, redisKey: String, redisHashKey: String): AjaxResult<Any?> {
        return buildAjaxResult(redisService.deleteHashValue(key, database, redisKey, redisHashKey))
    }

    @PostMapping("/delete-zset-value")
    fun deleteZsetValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        return buildAjaxResult(redisService.deleteZsetValue(key, database, redisKey, redisValue))
    }


    private fun buildAjaxResult(result: Boolean): AjaxResult<Any?> =
        if (result) AjaxResult.ok() else AjaxResult.error("操作异常")


}