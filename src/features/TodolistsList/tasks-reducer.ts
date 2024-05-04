import {
  addTodolistAC,
  AddTodolistActionType,
  ClearTodosDataActionType,
  removeTodolistAC,
  RemoveTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType,
} from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { AppRootStateType, AppThunk } from '../../app/store'
import { Action, Dispatch } from 'redux'
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ todoListId: string; taskId: string }>) {
      const tasksForCurrentTodolist = state[action.payload.todoListId]
      const index = tasksForCurrentTodolist.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasksForCurrentTodolist.splice(index, 1)
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(
      state,
      action: PayloadAction<{ todoListId: string; taskId: string; model: UpdateDomainTaskModelType }>
    ) {
      const tasksForCurrentTodolist = state[action.payload.todoListId]
      const index = tasksForCurrentTodolist.findIndex((task) => task.id === action.payload.taskId)
      tasksForCurrentTodolist[index] = { ...tasksForCurrentTodolist[index], ...action.payload.model }
    },
    setTasksAC(state, action: PayloadAction<{ todoListId: string; tasks: TaskType[] }>) {
      state[action.payload.todoListId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
  },
})

export const tasksReducer = slice.reducer
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } = slice.actions

//thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  if (todoListId === 'todoListId2' || todoListId === 'todoListId1') return
  dispatch(setAppStatusAC({ status: 'loading' }))
  todolistsAPI.getTasks(todoListId).then((res) => {
    dispatch(setTasksAC({ todoListId, tasks: res.data.items }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
  })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  todolistsAPI
    .createTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks?.[todoListId].find((el) => el.id === taskId)
    if (!task) {
      // throw new Error('Task not found in State')
      console.warn('Task not found')
      return
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }
    todolistsAPI
      .updateTask(todoListId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ todoListId, taskId, model: domainModel }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

// type ActionsType =
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | AddTodolistActionType
//   | RemoveTodolistActionType
//   | SetTodolistsActionType
//   | ReturnType<typeof setTasksAC>
//   | ClearTodosDataActionType

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
