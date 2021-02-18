package cn.gsein.redisclient.util

/**
 * @author G. Seinfeld
 * @since 2021/02/18
 */
enum class Lang(value: String) {
    ZH("简体中文"),
    EN("English"),
    CHS("繁體中文"),
    JP("日本語");

    companion object {
        fun from(abbreviate: String): Lang {
            for (value in values()) {
                if (value.name.equals(abbreviate, ignoreCase = true)) {
                    return value
                }
            }
            return ZH
        }
    }


}

