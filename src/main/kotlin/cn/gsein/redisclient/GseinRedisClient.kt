package cn.gsein.redisclient

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


/**
 * @author G. Seinfeld
 * @since 2021/02/17
 */
@SpringBootApplication
open class GseinRedisClient{
    @Bean
    open fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer{
            /**
             * Configure cross origin requests processing.
             * @since 4.2
             */
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**").allowedOrigins("*")
            }
        }
    }
}

fun main(args: Array<String>) {
    SpringApplicationBuilder(GseinRedisClient::class.java).run(*args)
}

