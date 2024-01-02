import React from 'react';
import '../../app/App.css';
import { Todolist} from '../../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";
import {TaskType} from "../../api/todolists-api";
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";



// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const {
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    } = useTasks()

    let {
        todolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist,
    } = useTodolists(
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist)


//comment roma
    return (
        <div className = "App">
            <AppBar position = "static">
                <Toolbar>
                    <IconButton edge = "start" color = "inherit" aria-label = "menu">
                        <Menu />
                    </IconButton>
                    <Typography variant = "h6">
                        News
                    </Typography>
                    <Button color = "inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style = {{padding: "20px"}}>
                    <AddItemForm addItem = {addTodolist} />
                </Grid>
                <Grid container spacing = {3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status);
                            }

                            // @ts-ignore
                            return <Grid key = {tl.id} item>
                                <Paper style = {{padding: "10px"}}>
                                    <Todolist
                                        // key={tl.id}
                                        id = {tl.id}
                                        title = {tl.title}
                                        tasks = {tasksForTodolist}
                                        removeTask = {removeTask}
                                        changeFilter = {changeFilter}
                                        addTask = {addTask}
                                        changeTaskStatus = {changeStatus}
                                        filter = {tl.filter}
                                        removeTodolist = {removeTodolist}
                                        changeTaskTitle = {changeTaskTitle}
                                        changeTodolistTitle = {changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App
