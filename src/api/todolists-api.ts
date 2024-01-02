import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // "API_KEY": "c78b138e-ca5b-4b60-95ae-eeedc6acebf3"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

//❗️Один объект отвечает за нюансы запросов

// todolists api
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
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },

    //tasks
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },

    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
    },

    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        console.log('called')
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },


}

// types
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
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High,
    Urgent = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: TaskType[]

}
