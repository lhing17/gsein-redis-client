package cn.gsein.redisclient

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import cn.gsein.redisclient.main as main1


/**
 * @author G. Seinfeld
 * @since 2021/02/17
 */
@SpringBootApplication
open class RedisClient : CommandLineRunner {
    override fun run(vararg args: String?) = main1()
}

fun main(args: Array<String>) {
    val builder = SpringApplicationBuilder(RedisClient::class.java)
    builder.headless(false).run(*args)
}
