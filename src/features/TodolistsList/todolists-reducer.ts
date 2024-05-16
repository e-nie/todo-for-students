import { v1 } from 'uuid'
import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { setAppStatusAC, StatusType } from '../../app/app-reducer'
import { handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from '../../common/actions/common.actions'

export let todoListId1 = v1() //'dsdsd-dsdsd2323232-4343ewew-sds'
export let todoListId2 = v1()

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  const res = await todolistsAPI.getTodolists()
  try {
    dispatch(setAppStatusAC({ status: 'succeeded' }))

    return { todolists: res.data }
  } catch (error: any) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolists', async (todoListId: string, { dispatch }) => {
  //изменяем глобальный статус, чтобы вверху побежала полоса
  dispatch(setAppStatusAC({ status: 'loading' }))
  // изменяем статус конкретного тудулиста, чтобы он мог задизейблить, что надо
  dispatch(changeTodolistEntityStatusAC({ id: todoListId, entityStatus: 'loading' }))
  await todolistsAPI.deleteTodolist(todoListId)
  // скажем глобально приложению, что асинхронная операция завершена
  dispatch(setAppStatusAC({ status: 'succeeded' }))
  return { id: todoListId }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolists', async (title: string, { dispatch }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  const res = await todolistsAPI.createTodolist(title)
  dispatch(setAppStatusAC({ status: 'succeeded' }))
  return { todolist: res.data.data.item }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string; title: string }) => {
  await todolistsAPI.updateTodolistTitle(param.id, param.title)
  return { id: param.id, title: param.title }
})

//slice
const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string; entityStatus: StatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    })

    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    })
    builder.addCase(clearTasksAndTodolists, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC, changeTodolistEntityStatusAC } = slice.actions

// types

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: StatusType // статус для дизэйбла кнопки удаления
}
