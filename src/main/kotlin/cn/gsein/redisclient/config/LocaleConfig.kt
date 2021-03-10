package cn.gsein.redisclient.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor
import org.springframework.web.servlet.i18n.SessionLocaleResolver
import java.util.*

/**
 * @author G. Seinfeld
 * @since 2021/03/10
 */
@Configuration
open class LocaleConfig {

    @Bean
    open fun localeResolver(): LocaleResolver {
        val localeResolver = SessionLocaleResolver()
        localeResolver.setDefaultLocale(Locale.SIMPLIFIED_CHINESE)
        return localeResolver
    }

    @Bean
    open fun localeInterceptor(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addInterceptors(registry: InterceptorRegistry) {
                val localeInterceptor = LocaleChangeInterceptor()
                localeInterceptor.paramName = "lang"
                registry.addInterceptor(localeInterceptor)
            }
        }
    }
}