import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../App/App'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {todolistId1} from "../App/id-utils";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    }

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    }

    const action = addTaskAC('todolistId2', 'juice')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    // expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: "React Book", status: TaskStatuses.New, todolistId: "todolistId1", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {
                id: '2', title: "React Book", status: TaskStatuses.New, todolistId: "todolistId2", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    }

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)

    const endState = tasksReducer(startState, action)


    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)

})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    }

    const action = changeTaskTitleAC('todolistId2', '2', 'Chocolate')
    const endState = tasksReducer(startState, action)


    expect(endState['todolistId2'][1].title).toBe('Chocolate')
    expect(endState['todolistId1'][1].title).toBe('JS')

})

test('new property and new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    }

    const action = addTodolistAC('title doesnt matter')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw new Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId2', order: 0, addedDate: ''}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('empty array should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 1', order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])


})

test('tasks should be added for todolist', () => {
    const startState: TasksStateType = {
        'todolistId1': [],
        'todolistId2': []
    }

    const action = setTasksAC(
        'todolistId1', [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todolistId: 'todolistId1', order: 0, addedDate: ''}
        ]
    )

    const endState = tasksReducer(startState, action)


    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)



})
