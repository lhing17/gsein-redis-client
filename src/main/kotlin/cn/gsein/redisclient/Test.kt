package cn.gsein.redisclient

import io.lettuce.core.RedisClient

/**
 * @author G. Seinfeld
 * @since 2021/02/18
 */
object Test {
    @JvmStatic
    fun main(args: Array<String>) {
        val client = RedisClient.create("redis://:ccjh123456@123.57.73.15/0")
        val connection = client.connect()
        val redisCommands = connection.sync()
        val keys = redisCommands.keys("*")
        println("keys = $keys")
    }

}