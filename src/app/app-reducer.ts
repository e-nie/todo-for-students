const initialState :InitialStateType= {
    status: 'idle' ,
    error: null
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

//ACs

export const setAppErrorAC = (error: null | string) => ({type:'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status:   StatusType) => ({type:'APP/SET-STATUS', status} as const)

//types

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppErrorActionType |SetAppStatusActionType

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: StatusType
    error: string | null
}
