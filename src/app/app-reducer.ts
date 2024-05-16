import { authAPI } from '../api/todolists-api'
import { setIsLoggedIn } from '../features/Login/auth-reducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (_, { dispatch }) => {
  const res = await authAPI.me()
  if (res.data.resultCode === 0) {
    dispatch(setIsLoggedIn({ value: true }))
  } else {
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialised: false,
  } as InitialStateType,

  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status
    },

    setAppErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialised = true
    })
  },
})

export const appReducer = slice.reducer

//ACs

export const { setAppStatusAC, setAppErrorAC } = slice.actions

//types

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppInitialisedActionType = ReturnType<typeof setAppInitialisedAC>

// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | SetAppInitialisedActionType
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером:
  status: StatusType
  // если произойдет какая-то глобальная ошибка - мы запишем текст ошибки сюда
  error: string | null
  // true, когда приложение проинициализировалось (проверили юзера, получили настройки итд)
  isInitialised: boolean
}
