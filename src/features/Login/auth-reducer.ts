import { authAPI, FieldErrorType, LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatusAC } from '../../app/app-reducer'
import { clearTasksAndTodolists } from '../../common/actions/common.actions'

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } }>(
  'auth/login',
  async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authAPI.login(param)
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
    }
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(clearTasksAndTodolists())
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
      return
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({})
    }
  } catch (error: any) {
    handleServerNetworkError(error, thunkAPI.dispatch)
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state) => {
      state.isLoggedIn = true
    })

    builder.addCase(logoutTC.fulfilled, (state) => {
      state.isLoggedIn = false
    })
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

//actions

//thunks
