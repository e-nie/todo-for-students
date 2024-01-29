import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {SetErrorActionType, setStatusAC, SetStatusActionType, StatusType} from "../../app/app-reducer";


export let todoListId1 = v1() //'dsdsd-dsdsd2323232-4343ewew-sds'
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = [
    // {id: todoListId1, title: 'What to learn', filter: 'all'},
    // {id: todoListId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST' :
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'SET-TODOLISTS' :
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists}) as const

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const removeTodolistTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todoListId)
            .then(res => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch:ThunkDispatch) => {
        todolistsAPI.updateTodolistTitle(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

// types
type ActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type  RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type  SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: StatusType // статус для дизэйбла кнопки удаления
}
type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType | SetErrorActionType>
