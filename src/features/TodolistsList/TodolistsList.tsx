import {useApp} from "../../app/hooks/useApp";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import React from "react";

export const TodolistsList = () => {
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
    } = useApp()

    return (
        <>
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
        </>
    )
}
