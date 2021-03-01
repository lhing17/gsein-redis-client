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

}