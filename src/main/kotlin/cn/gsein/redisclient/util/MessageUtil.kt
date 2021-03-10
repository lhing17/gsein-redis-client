package cn.gsein.redisclient.util

import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.stereotype.Component
import javax.annotation.Resource

/**
 * @author G. Seinfeld
 * @since 2021/02/18
 */
@Component
class MessageUtil {

    @Resource
    lateinit var messageSource: MessageSource

    fun message(code: String, vararg args: Any?): String {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale())
    }
}