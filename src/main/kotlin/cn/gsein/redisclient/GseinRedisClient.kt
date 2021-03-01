package cn.gsein.redisclient

import cn.gsein.redisclient.service.RedisService
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.annotation.Resource


/**
 * @author G. Seinfeld
 * @since 2021/02/17
 */
@SpringBootApplication
open class GseinRedisClient : CommandLineRunner {

    @Resource
    lateinit var redisService: RedisService

    @Bean
    open fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            /**
             * Configure cross origin requests processing.
             * @since 4.2
             */
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**").allowedOrigins("*")
            }
        }
    }

    /**
     * Callback used to run the bean.
     * @param args incoming main method arguments
     * @throws Exception on error
     */
    override fun run(vararg args: String?) {
        redisService.initAddressMap()
    }
}

fun main(args: Array<String>) {
    SpringApplicationBuilder(GseinRedisClient::class.java).run(*args)
}

