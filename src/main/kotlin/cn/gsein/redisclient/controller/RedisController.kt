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

    @PostMapping("/delete-list-value")
    fun deleteListValue(key: String, database: Int, redisKey: String, redisValue: String): AjaxResult<Any?> {
        val result = redisService.deleteListValue(key, database, redisKey, redisValue)
        return buildAjaxResult(result)
    }


    private fun buildAjaxResult(result: Boolean): AjaxResult<Any?> =
        if (result) AjaxResult.ok() else AjaxResult.error("操作异常")


}