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
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export let todoListId1 = v1() //'dsdsd-dsdsd2323232-4343ewew-sds'
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = [
  // {id: todoListId1, title: 'What to learn', filter: 'all'},
  // {id: todoListId2, title: 'What to buy', filter: 'all'},
]

const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    changeTodolistTitleAC: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilterAC: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string; entityStatus: StatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    setTodolistsAC: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    },
    clearTodosDataAC: (state, action: PayloadAction<{}>) => {},
  },
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC,
  clearTodosDataAC,
} = slice.actions
// debugger
// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch: any) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC({ todolists: res.data }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
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
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistEntityStatusAC({ id: todoListId, entityStatus: 'loading' }))
    todolistsAPI.deleteTodolist(todoListId).then((res) => {
      dispatch(removeTodolistAC({ id: todoListId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistsAPI.createTodolist(title).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        if (res.data.messages.length) {
          dispatch(setAppErrorAC({ error: res.data.messages[0] }))
        } else {
          dispatch(setAppErrorAC({ error: 'Some error occurred' }))
        }
        dispatch(setAppStatusAC({ status: 'failed' }))
      }
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(id, title).then((res) => {
      dispatch(changeTodolistTitleAC({ id, title }))
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
