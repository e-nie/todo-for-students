import {TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC('Some stupid error'))

    expect(endState.error).toBe('Some stupid error')

})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')

})




