package cn.gsein.redisclient.data

/**
 * @author G. Seinfeld
 * @since 2021/02/19
 */
data class ConnectionData(
    var host: String?,
    var port: Int?,
    val password: String?,
    val username: String?,
    val separator: String?,
    var createTimestamp: Long? = System.currentTimeMillis()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ConnectionData

        if (host != other.host) return false
        if (port != other.port) return false

        return true
    }

    override fun hashCode(): Int {
        var result = host?.hashCode() ?: 0
        result = 31 * result + (port ?: 0)
        return result
    }
}
