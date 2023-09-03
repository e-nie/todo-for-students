import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist'
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    ChangeTaskStatusPayloadType,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('AppWithRedux was called');

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    console.log(todolists)

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [])

    const addTask = useCallback(( todolistId: string,title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((payload:ChangeTaskStatusPayloadType) => {
        // debugger
        dispatch(changeTaskStatusAC(payload))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])


    return (
        <div className = "App">
            <AppBar position = "static">
                <Toolbar>
                    <IconButton
                        edge = "start"
                        color = "inherit"
                        aria-label = "menu">
                        <Menu />
                    </IconButton>
                    <Typography variant = "h6">
                        News
                    </Typography>
                    <Button color = "inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style = {{padding: '20px'}}>
                    <AddItemForm addItem = {addTodolist} />
                </Grid>
                <Grid container spacing = {3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks
                            return <Grid item>
                                <Paper style = {{padding: '10px'}}>
                                    <Todolist
                                        key = {tl.id}
                                        id = {tl.id}
                                        title = {tl.title}
                                        changeFilter = {changeFilter}
                                        filter = {tl.filter}
                                        removeTodolist = {removeTodolist}
                                        changeTodolistTitle = {changeTodolistTitle}
                                        addTask={addTask}
                                        changeTaskStatus = {changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTask={removeTask}
                                        tasks={tasksForTodolist}
                                    />
                                </Paper>
                            </Grid>

                        })}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithRedux;
