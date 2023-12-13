import React, {useEffect, useState} from 'react'
import axios from 'axios'
import app from "../App/App";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        // "API_KEY": "c78b138e-ca5b-4b60-95ae-eeedc6acebf3"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('bla-bla todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'df3dc3ab-dea2-40a9-80ad-7298cc0d7111'
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a6688ca3-68e4-44ea-a61f-05e22f6ed1e9'
    useEffect(() => {
        todolistsAPI.updateTodolistTitle(todolistId, 'I love you Evchen')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder = {'todolist Id'} value = {todolistId} onChange = {(e) => {
                setTodolistId(e.currentTarget.value)
            }} />
            <button onClick = {getTasks}>get tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    useEffect(() => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder = {'todolistId'} value = {todolistId} onChange = {(e) => {
                setTodolistId(e.currentTarget.value)
            }} />
            <input placeholder = {'taskId'} value = {taskId} onChange = {(e) => {
                setTaskId(e.currentTarget.value)
            }} />
            <button onClick = {deleteTask}>Delete Task</button>
        </div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder = {'todolist Id'} value = {todolistId} onChange = {(e) => {
                setTodolistId(e.currentTarget.value)
            }} />
            <input placeholder = {'task Title'} value = {taskTitle} onChange = {(e) => {
                setTaskTitle(e.currentTarget.value)
            }} />
            <button onClick = {createTask}>Create Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [tasktId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')


    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, tasktId, {taskTitle})
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder = {'todolist Id'} value = {todolistId} onChange = {(e) => {
                setTodolistId(e.currentTarget.value)
            }} />
            <input placeholder = {'task Id'} value = {tasktId} onChange = {(e) => {
                setTaskId(e.currentTarget.value)
            }} />
            <input placeholder = {'task Title'} value = {taskTitle} onChange = {(e) => {
                setTaskTitle(e.currentTarget.value)
            }} />
            <button onClick = {updateTask}>update Task</button>
        </div>
    </div>
}
