import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete } from "@mui/icons-material";
import {TaskType} from "./Todolist";
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: ( todolistId:string,taskId:string,isDone:boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    isDone:boolean
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        // debugger
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(
            props.todolistId,
         props.task.id,
            newIsDoneValue
        )
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    },[props.changeTaskTitle,props.todolistId, props.task.id])

    return <div key = {props.task.id} className = {props.task.isDone ? 'isDone' : ''}>
        <Checkbox onChange = {onChangeHandler} checked = {props.task.isDone} color = 'primary' />
        <EditableSpan title = {props.task.title} onChange = {onChangeTitleHandler} />
        <IconButton onClick = {onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
