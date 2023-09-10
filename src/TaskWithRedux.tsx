import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(todolistId,task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId,task.id, newIsDoneValue));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newValue));
    }

    return (
        <div className = {task.isDone ? "is-done" : ""}>
            <Checkbox
                checked = {task.isDone}
                color = "primary"
                onChange = {onChangeHandler}
            />

            <EditableSpan title = {task.title} onChange = {onTitleChangeHandler} />
            <IconButton onClick = {onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    )
})

