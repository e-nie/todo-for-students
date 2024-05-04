import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppRootStateType } from '../store'
import { useCallback, useEffect } from 'react'
import { addTaskTC, removeTaskAC, updateTaskTC } from '../../features/TodolistsList/tasks-reducer'
import {
  addTodolistAC,
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistAC,
  removeTodolistTC,
  setTodolistsAC,
  TodolistDomainType,
} from '../../features/TodolistsList/todolists-reducer'
import { TasksStateType } from '../../features/TodolistsList/tasks-reducer'
import { TaskStatuses, todolistsAPI } from '../../api/todolists-api'
import { Navigate } from 'react-router-dom'

type PropsType = {
  demo?: boolean
}

export const useApp = ({ demo = false }: PropsType) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  const removeTask = useCallback((taskId: string, todoListId: string) => {
    const thunk = removeTaskAC({ todoListId, taskId })
    dispatch(thunk)
  }, [])

  const addTask = useCallback((todoListId: string, title: string) => {
    const thunk = addTaskTC(title, todoListId)
    dispatch(thunk)
  }, [])

  const changeStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(id, { status }, todoListId))
  }, [])

  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, newTitle: string) => {
      console.log('todoListId', todoListId)
      dispatch(updateTaskTC(taskId, { title: newTitle }, todoListId))
    },
    [dispatch]
  )

  const changeFilter = useCallback(
    (todoListId: string, value: FilterValuesType) => {
      dispatch(changeTodolistFilterAC({ id: todoListId, filter: value }))
    },
    [dispatch]
  )

  const removeTodolist = useCallback((todoListId: string) => {
    const thunk = removeTodolistTC(todoListId)
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    const thunk = changeTodolistTitleTC(id, title)
    dispatch(thunk)
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title)
      dispatch(thunk)
    },
    [dispatch]
  )

  return {
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
  }
}
