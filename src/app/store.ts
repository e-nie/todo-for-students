import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/Login/auth-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

// type AppRootState = {
//     todolists:Array<TodolistType>
//     tasks:TasksStateType
// }

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
