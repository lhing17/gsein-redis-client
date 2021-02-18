package cn.gsein.redisclient

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.data.redis.connection.RedisConnectionFactory
import javax.annotation.Resource


/**
 * @author G. Seinfeld
 * @since 2021/02/17
 */
@SpringBootApplication
open class GseinRedisClient : CommandLineRunner {

    @Resource
    lateinit var redisConnectionFactory: RedisConnectionFactory

    override fun run(vararg args: String?) {
        main()
//        val connection = redisConnectionFactory.connection
//        val randomKey = connection.keyCommands().randomKey()
//        println("randomKey = $randomKey")
    }
}

fun main(args: Array<String>) {
    val builder = SpringApplicationBuilder(GseinRedisClient::class.java)
    builder.headless(false).run(*args)
}
