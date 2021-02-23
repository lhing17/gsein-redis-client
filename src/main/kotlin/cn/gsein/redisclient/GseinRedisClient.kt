package cn.gsein.redisclient

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder


/**
 * @author G. Seinfeld
 * @since 2021/02/17
 */
@SpringBootApplication
open class GseinRedisClient

fun main(args: Array<String>) {
    SpringApplicationBuilder(GseinRedisClient::class.java).run(*args)
}
