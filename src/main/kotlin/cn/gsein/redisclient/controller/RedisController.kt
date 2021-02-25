package cn.gsein.redisclient.controller

import cn.gsein.redisclient.data.ConnectionData
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * @author G. Seinfeld
 * @since 2021/02/23
 */
@RestController
@RequestMapping("/redis")
class RedisController {

    @GetMapping
    fun ensureConnected(): String {
        return "ok"
    }

    @PostMapping("/new-connection")
    fun newConnection(connectionData: ConnectionData): String {
        return "abcd"
    }
}