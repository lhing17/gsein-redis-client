package cn.gsein.redisclient

import androidx.compose.animation.core.Spring.StiffnessLow
import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.desktop.Window
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import cn.gsein.redisclient.ui.component.topBar
import cn.gsein.redisclient.util.I18NUtil
import cn.gsein.redisclient.util.Lang
import cn.gsein.redisclient.util.verticalSplittable

fun main() = Window {
    var dialogState by remember { mutableStateOf(false) }
    var lang by remember { mutableStateOf(Lang.EN) }
    val expandedSizeMin = 90.dp
    var expandedSize by remember { mutableStateOf(300.dp) }
    var isResizing by mutableStateOf(false)
    var dialogValue by mutableStateOf("")

    println(expandedSize)

    MaterialTheme(colors = lightColors()) {
        Scaffold(
            topBar = {
                topBar(
                    newButtonCallback = { dialogState = true },
                    langButtonCallback = { lang = Lang.ZH }
                )
            }
        ) {
            verticalSplittable(
                Modifier.fillMaxSize(),
                { isResizing = true },
                { isResizing = false },
                dragCallback = {
                    expandedSize = (expandedSize + it.toDp()).coerceAtLeast(expandedSizeMin)
                }
            ) {
                val animatedSize = if (isResizing) {
                    expandedSize
                } else {
                    animateDpAsState(
                        expandedSize,
                        SpringSpec(stiffness = StiffnessLow)
                    ).value
                }
                resizablePanel(Modifier.width(animatedSize).fillMaxHeight()) {
                    Column {
                        Text("2323")
                    }
                }

                Box {
                    Text("4566")
                }
            }
        }
    }

    // 弹出新建连接对话框
    if (dialogState) {
        Dialog(
            onDismissRequest = { dialogState = false },
            properties = DialogProperties(undecorated = true)
        ) {

            Column {
                I18NUtil.getMessage(lang, "newConnection")?.let { Text(it) }
                TextField(dialogValue, onValueChange = { dialogValue = it })
                Button(onClick = { dialogState = false }) { Text("取消") }
            }
        }
    }
}

@Composable
private fun resizablePanel(
    modifier: Modifier,
    content: @Composable () -> Unit,
) {
    val alpha by animateFloatAsState(1f, SpringSpec(stiffness = StiffnessLow))

    Box(modifier) {
        Box(Modifier.fillMaxSize().graphicsLayer(alpha = alpha)) {
            content()
        }


    }
}
