package cn.gsein.redisclient

import cn.gsein.redisclient.data.ConnectionData
import cn.gsein.redisclient.service.RedisService

/**
 * @author G. Seinfeld
 * @since 2021/02/18
 */
object Test {
    @JvmStatic
    fun main(args: Array<String>) {
        val redisService = RedisService(ConnectionData("123.57.73.15", 6379,"ccjh123456", 0))

        val info = redisService.info()
        for ((key, value) in info) {
            println("$key = $value")
        }
    }

}