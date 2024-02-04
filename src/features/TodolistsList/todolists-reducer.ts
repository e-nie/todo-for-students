import { v1 } from 'uuid'
import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppThunk } from '../../app/store'
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
  StatusType,
} from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { fetchTasksTC } from './tasks-reducer'

export let todoListId1 = v1() //'dsdsd-dsdsd2323232-4343ewew-sds'
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = [
  // {id: todoListId1, title: 'What to learn', filter: 'all'},
  // {id: todoListId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((el) => (el.id === action.id ? { ...el, title: action.title } : el))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((el) => (el.id === action.id ? { ...el, filter: action.filter } : el))
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map((el) => (el.id === action.id ? { ...el, entityStatus: action.entityStatus } : el))
    case 'SET-TODOLISTS':
      return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    case 'CLEAR-DATA':
      return []

    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id }) as const
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist }) as const
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title,
  }) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter,
  }) as const
export const changeTodolistEntityStatusAC = (id: string, entityStatus: StatusType) =>
  ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus,
  }) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists }) as const

export const clearTodosDataAC = () => ({ type: 'CLEAR-DATA' }) as const

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        debugger
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        return res.data
      })
      .then((todos) => {
        todos.forEach((tl) => {
          dispatch(fetchTasksTC(tl.id))
        })
      })

      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (todoListId: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    todolistsAPI.deleteTodolist(todoListId).then((res) => {
      dispatch(removeTodolistAC(todoListId))
      dispatch(setAppStatusAC('succeeded'))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        if (res.data.messages.length) {
          dispatch(setAppErrorAC(res.data.messages[0]))
        } else {
          dispatch(setAppErrorAC('Some error occurred'))
        }
        dispatch(setAppStatusAC('failed'))
      }
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: ThunkDispatch) => {
    todolistsAPI.updateTodolistTitle(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title))
    })
  }
}

// types
type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | SetTodolistsActionType
  | ChangeTodolistEntityActionType
  | ClearTodosDataActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: StatusType // статус для дизэйбла кнопки удаления
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
