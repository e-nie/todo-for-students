import { addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC } from './tasks-reducer'

import { addTodolistTC, fetchTodolistsTC, removeTodolistTC, todoListId1 } from './todolists-reducer'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api'

let startState: TasksStateType = {}
beforeEach(() => {
  startState = {
    todoListId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
    ],
    todoListId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  let param = { todoListId: 'todoListId2', taskId: '2' }
  const action = removeTaskTC.fulfilled(param, 'requestId', param)

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todoListId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
      },
    ],
    todoListId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: '',
      },
    ],
  })
})

test('correct task should be added to correct array', () => {
  // const action = addTaskAC('todoListId2', 'juice')
  const task = {
    todoListId: 'todoListId2',
    title: 'juice',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: 'leo',
  }
  const action = addTaskTC.fulfilled(task, 'requestId', { title: task.title, todoListId: task.todoListId })

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('juice')
})

test('status of specified task should be changed', () => {
  const updateModel = { todoListId: 'todoListId2', taskId: '2', model: { status: TaskStatuses.New } }
  const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
  let updateModel = { todoListId: 'todoListId2', taskId: '2', model: { title: 'Chocolate' } }
  const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].title).toBe('Chocolate')
  expect(endState['todoListId1'][1].title).toBe('JS')
})

test('new property and new array should be added when new todolist is added', () => {
  const payload = {
    todolist: {
      id: '123',
      title: 'from Test',
      addedDate: 'today',
      order: 0,
    },
  }

  const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title)

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todoListId1' && k !== 'todoListId2')
  if (!newKey) {
    throw new Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todoListId should be deleted', () => {
  const action = removeTodolistTC.fulfilled({ id: 'todoListId2' }, 'requestId', 'todoListId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todoListId2']).toBeUndefined()
})

test('empty array should be added when we set todolists', () => {
  let payload = {
    todolists: [
      { id: '1', title: 'title 1', order: 0, addedDate: '' },
      { id: '2', title: 'title 1', order: 0, addedDate: '' },
    ],
  }
  const action = fetchTodolistsTC.fulfilled(payload, 'requestId')
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
  // const startState: TasksStateType = {
  //   todoListId1: [],
  //   todoListId2: [],
  // }

  const action = fetchTasksTC.fulfilled(
    {
      tasks: startState['todoListId1'],
      todoListId: 'todoListId1',
    },
    '',
    'todolistId1'
  )

  const endState = tasksReducer(
    {
      todoListId2: [],
      todoListId1: [],
    },
    action
  )

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(0)
})
