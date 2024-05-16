import { addTodolistTC, TodolistDomainType, todolistsReducer } from './todolists-reducer'
import { tasksReducer, TasksStateType } from './tasks-reducer'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  let payload = {
    todolist: {
      id: '123',
      title: 'from Test',
      addedDate: 'today',
      order: 0,
    },
  }
  const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
