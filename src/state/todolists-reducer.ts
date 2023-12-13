import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";
// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType


export let todolistId1 = v1() //'dsdsd-dsdsd2323232-4343ewew-sds'
export let todolistId2 = v1()

const initialState: Array<TodolistDomainType> = [
    // {id: todolistId1, title: 'What to learn', filter: 'all'},
    // {id: todolistId2, title: 'What to buy', filter: 'all'},
]

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    // debugger
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: ' ',
                order: 0
            },
                ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTotodlistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTotodlistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
