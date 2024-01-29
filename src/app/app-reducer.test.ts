import {TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC('Some stupid error'))

    expect(endState.error).toBe('Some stupid error')

})

test('correct status should be set', () => {

    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')

})




