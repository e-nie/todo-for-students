import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from './api/todolists-api';

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const TaskWithRedux = memo(({task, todoListId}: TaskPropsType) => {

    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(todoListId,task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todoListId,task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(todoListId, task.id, newValue));
    }

    console.log(task.status);
    return (
        <div className = {task.status ===TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked = {task.status === TaskStatuses.Completed}
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

