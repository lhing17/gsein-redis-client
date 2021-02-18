package cn.gsein.redisclient

import androidx.compose.desktop.Window
import androidx.compose.foundation.layout.Box
import androidx.compose.material.*
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.Notifier
import cn.gsein.redisclient.ui.component.topBar
import cn.gsein.redisclient.util.I18NUtil
import cn.gsein.redisclient.util.Lang

fun main() = Window {
    var text by remember { mutableStateOf("Hello, World!") }
    val notifier = Notifier()
    val message = "Some message"

    val dialogState = remember { mutableStateOf(false) }
    val lang = remember { mutableStateOf(Lang.EN) }

    MaterialTheme(colors = lightColors()) {
        Scaffold(topBar = { topBar(newButtonCallBack = { dialogState.value = true }) }) {
            Box { }
            Button(onClick = {lang.value = Lang.ZH}){
                Text("切换中文")
            }
        }
    }

    // 弹出新建连接对话框
    if (dialogState.value) {
        Dialog(onDismissRequest = { dialogState.value = false }) {
            I18NUtil.getMessage(lang.value, "newConnection")?.let { Text(it) }
        }
    }
}

