package cn.gsein.redisclient.util

/**
 * @author G. Seinfeld
 * @since 2021/02/19
 */
import androidx.compose.desktop.AppManager
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.width
import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.gesture.scrollorientationlocking.Orientation
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerMoveFilter
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import java.awt.Cursor

fun Modifier.cursorForHorizontalResize(): Modifier = composed {
    var isHover by remember { mutableStateOf(false) }

    val window = AppManager.focusedWindow?.window
    window?.let {
        if (isHover) {
            it.cursor = Cursor(Cursor.E_RESIZE_CURSOR)
        } else {
            it.cursor = Cursor.getDefaultCursor()
        }
    }

    pointerMoveFilter(
        onEnter = { isHover = true; true },
        onExit = { isHover = false; true }
    )
}

@Composable
fun verticalSplittable(
    modifier: Modifier,
    dragStartCallback: (Offset) -> Unit,
    dragStoppedCallback: (Float) -> Unit,
    dragCallback: Density.(Float) -> Unit,
    children: @Composable () -> Unit
) = Layout({
    children()
    verticalSplitter(dragStartCallback, dragStoppedCallback, dragCallback)
}, modifier = modifier, measureBlock = { measurables, constraints ->
    require(measurables.size == 3)

    val firstPlaceable = measurables[0].measure(constraints.copy(minWidth = 0))
    val secondWidth = constraints.maxWidth - firstPlaceable.width
    val secondPlaceable = measurables[1].measure(
        Constraints(
            minWidth = secondWidth,
            maxWidth = secondWidth,
            minHeight = constraints.maxHeight,
            maxHeight = constraints.maxHeight
        )
    )
    val splitterPlaceable = measurables[2].measure(constraints)
    layout(constraints.maxWidth, constraints.maxHeight) {
        firstPlaceable.place(0, 0)
        secondPlaceable.place(firstPlaceable.width, 0)
        splitterPlaceable.place(firstPlaceable.width, 0)
    }
})

@Composable
fun verticalSplitter(
    dragStartCallback: (Offset) -> Unit,
    dragStoppedCallback: (Float) -> Unit,
    dragCallback: Density.(Float) -> Unit,
    color: Color = MaterialTheme.colors.secondary
) = Box {
    Box(
        Modifier
            .width(8.dp)
            .fillMaxHeight()
            .run {
                this.draggable(
                    onDrag = dragCallback,
                    orientation = Orientation.Horizontal,
                    startDragImmediately = true,
                    onDragStarted = dragStartCallback,
                    onDragStopped = dragStoppedCallback
                ).cursorForHorizontalResize()
            }
    )

    Box(
        Modifier
            .width(1.dp)
            .fillMaxHeight()
            .background(color)
    )
}