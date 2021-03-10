package cn.gsein.redisclient.data

/**
 * @author G. Seinfeld
 * @since 2021/02/26
 */
class AjaxResult<T>(val code: Int?, val message: String?, val data: T? = null) {
    companion object {
        fun <T> ok(data: T? = null, message: String): AjaxResult<T> {
            return AjaxResult(200, message, data)
        }

        fun <T> error(message: String?): AjaxResult<T> {
            return AjaxResult(500, message)
        }
    }
}