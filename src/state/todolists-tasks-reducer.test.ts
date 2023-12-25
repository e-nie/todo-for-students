import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../App/App";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC(
        {
            id: '123',
            title: 'from Test',
            addedDate: 'today',
            order: 0
        })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})

