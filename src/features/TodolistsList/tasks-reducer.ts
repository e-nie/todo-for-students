import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from './todolists-reducer'
import { TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { AppRootStateType } from '../../app/store'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from '../../common/actions/common.actions'

// types

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  const res = await todolistsAPI.getTasks(todoListId)
  // const tasks = res.data.items
  thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
  return { todoListId, tasks: res.data.items }
})

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (
    param: {
      taskId: string
      todoListId: string
    },
    thunkAPI
  ) => {
    const res = await todolistsAPI.deleteTask(param.todoListId, param.taskId)
    return { taskId: param.taskId, todoListId: param.todoListId }
  }
)
export const addTaskTC = createAsyncThunk(
  'tasks/addTask',
  async (
    param: {
      title: string
      todoListId: string
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await todolistsAPI.createTask(param.todoListId, param.title)

      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return res.data.data.item
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const updateTaskTC = createAsyncThunk(
  'tasks/updateTask',
  async (param: { taskId: string; model: UpdateDomainTaskModelType; todoListId: string }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppRootStateType
    const task = state.tasks?.[param.todoListId].find((el: any) => el.id === param.taskId)
    if (!task) {
      return rejectWithValue('Task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...param.model,
    }
    const res = await todolistsAPI.updateTask(param.todoListId, param.taskId, apiModel)
    try {
      if (res.data.resultCode === 0) {
        return param
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue('Task not found in the state')
    }
  }
)

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasksForCurrentTodolist = state[action.payload.todoListId]
      const index = tasksForCurrentTodolist.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasksForCurrentTodolist.splice(index, 1)
      }
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasksForCurrentTodolist = state[action.payload.todoListId]
      const index = tasksForCurrentTodolist.findIndex((task) => task.id === action.payload.taskId)
      tasksForCurrentTodolist[index] = { ...tasksForCurrentTodolist[index], ...action.payload.model }
    })
    builder.addCase(clearTasksAndTodolists, () => {
      //to see state in console we use 'current' function
      // console.log(current(state))
      return {}
    })
  },
})

export const tasksReducer = slice.reducer

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
