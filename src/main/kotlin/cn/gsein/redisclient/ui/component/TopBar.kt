package cn.gsein.redisclient.ui.component

import androidx.compose.foundation.layout.Row
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.ArrowDropDown
import androidx.compose.material.icons.outlined.KeyboardArrowDown
import androidx.compose.runtime.Composable

@Composable
fun topBar(newButtonCallBack: () -> Unit) {
    TopAppBar {
        Row {
            IconButton(onClick = newButtonCallBack) {
                Icon(imageVector = Icons.Outlined.Add, contentDescription = "新建连接")
            }
            IconButton(onClick = { println("import") }) {
                Icon(imageVector = Icons.Outlined.ArrowDropDown, contentDescription = "导入")
            }
            IconButton(onClick = { println("export") }) {
                Icon(imageVector = Icons.Outlined.KeyboardArrowDown, contentDescription = "导出")
            }
        }

    }
}