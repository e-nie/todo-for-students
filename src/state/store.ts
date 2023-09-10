import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";


const  rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer

})

// type AppRootState = {
//     todolists:Array<TodolistType>
//     tasks:TasksStateType
// }

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)



// @ts-ignore
window.store = store
