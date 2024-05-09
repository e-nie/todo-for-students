import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer'
import { TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { AppRootStateType } from '../../app/store'
import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// types

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  const res = await todolistsAPI.getTasks(todoListId)
  const tasks = res.data.items
  thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
  return { todoListId, tasks: res.data.items }
})

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { taskId: string; todoListId: string }, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(param.todoListId, param.taskId)
    return { taskId: param.taskId, todoListId: param.todoListId }
  }
)

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
    const task = state.tasks?.[todoListId].find((el: any) => el.id === taskId)
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
  },
})

export const tasksReducer = slice.reducer
export const { addTaskAC, updateTaskAC } = slice.actions

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
