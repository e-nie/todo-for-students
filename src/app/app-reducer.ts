import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { setIsLoggedIn } from '../features/Login/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialised: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status
    },

    setAppErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setAppInitialisedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialised = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer

//ACs

export const { setAppStatusAC, setAppErrorAC, setAppInitialisedAC } = slice.actions

//thunks

export const initialiseAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ value: true }))
    } else {
    }
    dispatch(setAppInitialisedAC({ isInitialized: true }))
  })
}

//types

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitialisedActionType = ReturnType<typeof setAppInitialisedAC>

type ActionsType = SetAppErrorActionType | SetAppStatusActionType | SetAppInitialisedActionType
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером:
  status: StatusType
  // если произойдет какая-то глобальная ошибка - мы запишем текст ошибки сюда
  error: string | null
  // true, когда приложение проинициализировалось (проверили юзера, получили настройки итд)
  isInitialised: boolean
}
