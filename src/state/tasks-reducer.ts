import {TasksStateType} from "../AppWithRedux/AppWithRedux";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {todolistId2} from "../App/id-utils";
import {AppThunk} from "./store";
import {Dispatch} from "redux";
// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
// export type AddTaskPayloadType = {
//     title: string
//     todolistId: string
// }
export type  AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}


export type  ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type  changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todolistId: string

}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(el => el.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK' : {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {
                id: v1(), title: action.title, status: TaskStatuses.New, todolistId: todolistId2, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            // debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId
                        ? {...el, status: action.status}
                        : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            // const stateCopy = {...state}
            // let tasks = stateCopy[action.todolistId]
            // let task = tasks.find(t => t.id === action.taskId)
            // if (task) {
            //     task.title === action.title
            // }
            // return stateCopy
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const fetchTasksTC = (todolistId:string):AppThunk => {

    return (dispatch:Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res=> {
                dispatch(setTasksAC(todolistId, res.data.items))

            })
    }
}
