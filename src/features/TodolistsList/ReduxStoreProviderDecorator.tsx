import { Provider } from 'react-redux'
import { AppRootStateType, store } from '../../app/store'
import { applyMiddleware, combineReducers, createStore, legacy_createStore } from 'redux'

import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { appReducer } from '../../app/app-reducer'
import { thunk } from 'redux-thunk'
import { authReducer } from '../Login/auth-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  login: authReducer,
})

export const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading' },
  ],
  tasks: {
    ['todoListId1']: [
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId1',
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId1',
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    ['todoListId2']: [
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId2',
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todoListId2',
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    error: null,
    status: 'idle',
    isInitialised: false,
  },
  auth: { isLoggedIn: false },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
