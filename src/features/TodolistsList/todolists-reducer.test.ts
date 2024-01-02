import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer, TodolistDomainType, FilterValuesType, SetTodolistsActionType, setTodolistsAC
} from './todolists-reducer'
import {v1} from 'uuid'
import {UpdateTaskModelType} from "../../api/todolists-api";
import {todoListId1, todoListId2} from "../../trash/App/id-utils";


class TodolistTypeType {
}

test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, addTodolistAC({
        id: '123',
        title: newTodolistTitle,
        addedDate: 'today',
        order: 0
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = changeTodolistTitleAC(todoListId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistDomainType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = changeTodolistFilterAC(todoListId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})


test('todolists should be set to the state', () => {

    let startState: Array<TodolistDomainType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

