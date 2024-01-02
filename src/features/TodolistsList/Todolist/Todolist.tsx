import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../app/store";
import {fetchTasksTC} from "../tasks-reducer";
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {

    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks // ❗️

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3><EditableSpan title = {props.title} onChange = {changeTodolistTitle} />
                <IconButton onClick = {removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem = {addTask} />
            <div>
                {
                    tasksForTodolist.map(t => <Task
                        task = {t}
                        // changeTaskStatus = {props.changeTaskStatus}
                        // changeTaskTitle = {props.changeTaskTitle}
                        // removeTask = {props.removeTask}
                        todoListId = {props.id}
                        key = {t.id}
                    />)
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
});



