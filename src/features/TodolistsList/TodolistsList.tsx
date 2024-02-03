import { useApp } from '../../app/hooks/useApp'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import React from 'react'
import { Navigate } from 'react-router-dom'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
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
    isLoggedIn,
  } = useApp({ demo })

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]
          let tasksForTodolist = allTodolistTasks
          return (
            <Grid item>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  key={tl.id}
                  changeFilter={changeFilter}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTask={removeTask}
                  tasks={tasksForTodolist}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
