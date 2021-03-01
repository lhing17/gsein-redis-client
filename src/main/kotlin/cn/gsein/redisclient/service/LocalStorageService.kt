package cn.gsein.redisclient.service

import cn.gsein.redisclient.data.ConnectionData
import com.alibaba.fastjson.JSON
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Paths

/**
 * 将对象存储/同步到本地文件的服务
 *
 * @author G. Seinfeld
 * @since 2021/02/26
 */
@Service
class LocalStorageService {

    companion object {
        const val USER_HOME_KEY = ".redis-worker"
        const val CONNECTION_INFO_FILE_NAME = "connections.json"
    }


    fun synchronize(redisAddressMap: MutableMap<String, ConnectionData>) {
        val userHome = System.getProperty("user.home")
        val connectionInfoFile = Paths.get(userHome, USER_HOME_KEY, CONNECTION_INFO_FILE_NAME)
        Files.createDirectories(connectionInfoFile.parent)
        Files.writeString(connectionInfoFile, JSON.toJSONString(redisAddressMap))
    }

    fun init(): Map<String, ConnectionData> {
        val userHome = System.getProperty("user.home")
        val connectionInfoFile = Paths.get(userHome, USER_HOME_KEY, CONNECTION_INFO_FILE_NAME)
        return if (Files.exists(connectionInfoFile)) {
            val bytes = Files.readAllBytes(connectionInfoFile)
            val content = String(bytes)
            val parsed = JSON.parseObject(content)
            parsed.entries.associateBy({ it.key }, { JSON.toJavaObject(it.value as JSON?, ConnectionData::class.java) })
        } else HashMap()
    }

}