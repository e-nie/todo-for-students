import {TasksStateType} from "../AppWithRedux/AppWithRedux";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {todoListId2} from "../App/id-utils";
import {AppRootStateType, AppThunk} from "./store";
import {Dispatch} from "redux";
// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todoListId: string
}
// export type AddTaskPayloadType = {
//     title: string
//     todoListId: string
// }
export type  AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}


export type  UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todoListId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type  changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todoListId: string

}


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
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
            const tasks = stateCopy[action.todoListId]
            const filteredTasks = tasks.filter(el => el.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK' : {
            const stateCopy = {...state} //копируем стейт
            const newTask = action.task //берем новую таску из экшна
            const tasks = stateCopy[newTask.todoListId] //получаем все таски из этого же тудулиста, куда добавляем новую таску
            const newTasks = [newTask, ...tasks] // аппендим новую таску  в массив к остальным найденным таскам в этом туду
            stateCopy[newTask.todoListId] = newTasks //возвращаемый стейт приравниваем к значению массива тасок с новой таской
            return stateCopy // возвращаем кусок измененного стейта
        }
        /*
        {task3:{id}}
        * const state = {'todolistId1': [{task1}, {task2}], 'todolistId2': []}
        * state.one
        * state['one']
        * const key = 'one'
        * state[key]
        * */
        case 'UPDATE-TASK': {
            //
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId
                        ? {...el, ... action.model}
                        : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            // const stateCopy = {...state}
            // let tasks = stateCopy[action.todoListId]
            // let task = tasks.find(t => t.id === action.taskId)
            // if (task) {
            //     task.title === action.title
            // }
            // return stateCopy
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
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
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todoListId, taskId, model}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title}
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: 'SET-TASKS', todoListId, tasks}
}

export const fetchTasksTC = (todoListId: string): AppThunk => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoListId)
            .then(res => {
                dispatch(setTasksAC(todoListId, res.data.items))

            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoListId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todoListId, taskId))
            })
    }
}

export const addTaskTC = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoListId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()

        console.log('state', state, todoListId)
        const task = state.tasks?.[todoListId].find(el => el.id === taskId)
        if (!task) {
            // throw new Error('Task not found in State')
            console.warn('Task not found')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistsAPI.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todoListId, taskId, domainModel))
            })
    }
}

