package cn.gsein.redisclient.ui.component

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.ArrowDropDown
import androidx.compose.material.icons.outlined.Favorite
import androidx.compose.material.icons.outlined.KeyboardArrowDown
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun topBar(
    newButtonCallback: () -> Unit = {},
    importButtonCallback: () -> Unit = {},
    exportButtonCallback: () -> Unit = {},
    langButtonCallback: () -> Unit = {},
) {
    TopAppBar {
        Row(modifier = Modifier.fillMaxWidth()) {
            IconButton(onClick = newButtonCallback) {
                Icon(imageVector = Icons.Outlined.Add, contentDescription = "新建连接")
            }
            IconButton(onClick = importButtonCallback ) {
                Icon(imageVector = Icons.Outlined.ArrowDropDown, contentDescription = "导入")
            }
            IconButton(onClick = exportButtonCallback) {
                Icon(imageVector = Icons.Outlined.KeyboardArrowDown, contentDescription = "导出")
            }
            IconButton(onClick = langButtonCallback) {
                Icon(imageVector = Icons.Outlined.Favorite, contentDescription = "切换语言")
            }
        }

    }
}