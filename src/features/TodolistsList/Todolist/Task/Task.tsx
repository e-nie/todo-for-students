import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";

import {useDispatch} from "react-redux";
import {
    removeTaskAC,
    updateTaskTC
} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {AppDispatch} from "../../../../app/store";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const Task = memo(({task, todoListId}: TaskPropsType) => {


    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()


    const onClickHandler = () => dispatch(removeTaskAC(todoListId,task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(updateTaskTC(task.id,
            {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todoListId, ));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTaskTC(task.id, {title: newValue}, todoListId, ));
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

