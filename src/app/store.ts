import { AnyAction, applyMiddleware, legacy_createStore } from 'redux'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Login/auth-reducer'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { appReducer } from './app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})
// export type AppRootStateType = ReturnType<RootReducerType>

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// export type RootReducerType = typeof rootReducer
export const store = configureStore({
  reducer: rootReducer,
})
type AppStore = typeof store
export type AppRootStateType = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
// export type AppDispatch = typeof store.dispatch

// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
