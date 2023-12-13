import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(  props.todolistId,
            props.task.id,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        )
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    return <div key = {props.task.id} className = {props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox onChange = {onChangeHandler} checked = {props.task.status === TaskStatuses.Completed}
                  color = 'primary' />
        <EditableSpan title = {props.task.title} onChange = {onChangeTitleHandler} />
        <IconButton onClick = {onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
