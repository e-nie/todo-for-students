import React, {useCallback, useReducer, useState} from 'react';
import '../App.css';
import {Todolist, TaskType} from '../Todolist'
import {v1} from "uuid";
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    // ChangeTaskStatusPayloadType,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {useAppWithRedux} from "./hooks/useAppWithRedux";

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

    const {
        todolists,
        tasks,
        addTask,
        addTodolist,
        changeFilter,
        changeStatus,
        changeTaskTitle,
        removeTask,
        removeTodolist,
        changeTodolistTitle,



    } = useAppWithRedux()

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
                                        addTask = {addTask}
                                        changeTaskStatus = {changeStatus}
                                        changeTaskTitle = {changeTaskTitle}
                                        removeTask = {removeTask}
                                        tasks = {tasksForTodolist}
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
