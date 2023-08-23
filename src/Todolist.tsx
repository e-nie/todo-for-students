import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (id: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

const Todolist = (props: PropsType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')


    let tasksForTodolist = tasks // ❗️
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title = {props.title} onChange = {changeTodolistTitle} />
                <IconButton onClick = {removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem = {(title) => {
                dispatch(addTaskAC(props.id, title))

            }} />
            <div>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(props.id, t.id))

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked))
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(props.id, t.id, newValue))
                        }

                        return <div key = {t.id}
                                    className = {t.isDone ? 'isDone' : ''}
                        >
                            <Checkbox onChange = {onChangeStatusHandler} checked = {t.isDone} />
                            <EditableSpan title = {t.title} onChange = {onChangeTitleHandler} />
                            <IconButton onClick = {onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }

            </div>
            <div>
                <Button variant = {props.filter === 'all' ? 'contained' : 'text'}
                        onClick = {onAllClickHandler}>All
                </Button>
                <Button color = 'primary' variant = {props.filter === 'active' ? 'contained' : 'text'}
                        onClick = {onActiveClickHandler}>Active
                </Button>
                <Button color = 'secondary' variant = {props.filter === 'completed' ? 'contained' : 'text'}
                        onClick = {onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};


export default Todolist;
