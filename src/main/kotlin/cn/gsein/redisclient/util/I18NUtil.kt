package cn.gsein.redisclient.util

import com.alibaba.fastjson.JSON
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

/**
 * @author G. Seinfeld
 * @since 2021/02/18
 */
object I18NUtil {

    private val i18nMap: MutableMap<Lang, MutableMap<String, Any>> = EnumMap(Lang::class.java)

    init {
        val url = Optional.ofNullable(I18NUtil.javaClass.classLoader.getResource("i18n"))
        url.map { it.toURI() }.map { Paths.get(it) }.map { Files.walk(it) }.ifPresent {
            it.filter { path -> Files.isRegularFile(path) }.forEach { path ->
                val s = path.fileName.toString().substringBefore(".json")
                val content = String(Files.readAllBytes(path))
                i18nMap[Lang.from(s)] = JSON.parseObject(content)
            }
        }
    }

    fun getMessage(lang: Lang, key: String): String? {
        return i18nMap[lang]?.get(key)?.toString()
    }
}