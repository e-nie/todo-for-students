import axios from 'axios'
import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        // "API_KEY": "c78b138e-ca5b-4b60-95ae-eeedc6acebf3"
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: number
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    // description: string
    // status: number
    // priority: number
    // startDate: string
    // deadline: string
}

type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: TaskType[]

}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

//❗️Один объект отвечает за нюансы запросов

//todolists
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
        return promise
    },

    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = instance.put<ResponseType>(` todo-lists/${id}`, {title: title})
        return promise
    },

    //tasks
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId} `, model)
    },


}

