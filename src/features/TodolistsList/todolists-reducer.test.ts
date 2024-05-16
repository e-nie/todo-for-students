import {
  changeTodolistFilterAC,
  todolistsReducer,
  TodolistDomainType,
  FilterValuesType,
  changeTodolistEntityStatusAC,
  fetchTodolistsTC,
  removeTodolistTC,
  changeTodolistTitleTC,
  addTodolistTC,
} from './todolists-reducer'
import { v1 } from 'uuid'
import { StatusType } from '../../app/app-reducer'

let todoListId1: string
let todoListId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
  todoListId1 = v1()
  todoListId2 = v1()
  startState = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    { id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ]
})
test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({ id: todoListId1 }, 'requestId', todoListId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'
  let todolist = {
    id: '123',
    title: newTodolistTitle,
    addedDate: 'today',
    order: 0,
  }

  const endState = todolistsReducer(startState, addTodolistTC.fulfilled({ todolist }, 'requestId', todolist.title))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  let payload = { id: todoListId2, title: newTodolistTitle }
  const action = changeTodolistTitleTC.fulfilled(payload, 'requestId', payload)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeTodolistFilterAC({ id: todoListId2, filter: newFilter })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {
  let payload = { todolists: startState }
  const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  let newStatus: StatusType = 'loading'

  const action = changeTodolistEntityStatusAC({ id: todoListId2, entityStatus: newStatus })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})
