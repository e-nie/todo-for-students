import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reducer'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialised: false,
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-IS-INITIALISED':
      return { ...state, isInitialised: action.value }
    default:
      return { ...state }
  }
}

//ACs

export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error }) as const
export const setAppStatusAC = (status: StatusType) => ({ type: 'APP/SET-STATUS', status }) as const
export const setAppInitialisedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALISED', value }) as const

//thunks

export const initialiseAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {
    }
    dispatch(setAppInitialisedAC(true))
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
