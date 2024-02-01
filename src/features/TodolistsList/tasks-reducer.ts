import {
  addTodolistAC,
  AddTodolistActionType,
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

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return { ...state, [action.todoListId]: state[action.todoListId].filter((el) => el.id !== action.taskId) }
    case 'ADD-TASK':
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((el) =>
          el.id === action.taskId ? { ...el, ...action.model } : el
        ),
      }
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] }
    case 'REMOVE-TODOLIST':
      const stateCopy = { ...state }
      delete stateCopy[action.id]
      return stateCopy
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state }
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'SET-TASKS':
      return { ...state, [action.todoListId]: action.tasks }
    default:
      return state
  }
}

// actions
export const removeTaskAC = (todoListId: string, taskId: string) =>
  ({ type: 'REMOVE-TASK', todoListId, taskId }) as const
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task }) as const
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  ({
    type: 'UPDATE-TASK',
    todoListId,
    taskId,
    model,
  }) as const
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({ type: 'SET-TASKS', todoListId, tasks }) as const

//thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
  if (todoListId === 'todoListId2' || todoListId === 'todoListId1') return
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.getTasks(todoListId).then((res) => {
    dispatch(setTasksAC(todoListId, res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  })
}
export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: ThunkDispatch) => {
  todolistsAPI.deleteTask(todoListId, taskId).then((res) => {
    dispatch(removeTaskAC(todoListId, taskId))
  })
}
export const addTaskTC = (title: string, todoListId: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI
    .createTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
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
  (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
          dispatch(updateTaskAC(todoListId, taskId, domainModel))
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

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
