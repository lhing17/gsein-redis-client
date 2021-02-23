package cn.gsein.redisclient.ui.component

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable

/**
 * @author G. Seinfeld
 * @since 2021/02/23
 */
@Composable
fun gseinForm(
    content: ColumnScope.() -> Unit,
    confirmCallback: () -> Unit,
    cancelCallback: () -> Unit
) {
    Box {
        Column { content() }
        Button(onClick = confirmCallback) { Text("确定") }
        Button(onClick = cancelCallback) { Text("取消") }
    }
}