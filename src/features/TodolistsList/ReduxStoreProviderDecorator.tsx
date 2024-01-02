import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../app/store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {todoListId2} from "../../trash/App/id-utils";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todoListId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todoListId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todoListId1"]: [
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todoListId1", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            }],
        ["todoListId2"]: [
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todoListId2", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store = {storyBookStore}>{storyFn()}</Provider>
}
