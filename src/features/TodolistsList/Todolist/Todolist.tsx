import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todolists-api'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { fetchTasksTC } from '../tasks-reducer'
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (title: string, todoListId: string) => void
  removeTask: (id: string, todoListId: string) => void
  changeTaskStatus: (todoListId: string, id: string, status: TaskStatuses) => void
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
  removeTodolist: (todoListId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  demo?: boolean
}

export const Todolist = React.memo(function ({ demo = false, ...props }: PropsType) {
  const useAppDispatch = () => useDispatch<AppDispatch>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // if (demo) {
    //     return
    // }
    dispatch(fetchTasksTC(props.todolist.id))
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todolist.id, title)
    },
    [props.addTask, props.todolist.id]
  )

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.todolist.id)
  }, [])
  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.todolist.id, newTitle)
    },
    [props.todolist.id, props.changeTodolistTitle]
  )

  const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.changeFilter, props.todolist.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.changeFilter, props.todolist.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.changeFilter, props.todolist.id])

  let tasksForTodolist = props.tasks // ❗️

  if (props.todolist.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <div>
        {tasksForTodolist?.map((t) => (
          <Task
            task={t}
            // changeTaskStatus = {props.changeTaskStatus}
            // changeTaskTitle = {props.changeTaskTitle}
            // removeTask = {props.removeTask}
            todoListId={props.todolist.id}
            key={t.id}
          />
        ))}
      </div>
      <div>
        <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button color="primary" variant={props.todolist.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button color="secondary" variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>
          Completed
        </Button>
      </div>
    </div>
  )
})
