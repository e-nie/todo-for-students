import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {todolistId2} from "../App/id-utils";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId: "todolistId1", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId: 'todolistId1', description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            }],
        ["todolistId2"]: [
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId: "todolistId2", description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId: 'todolistId2', description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store = {storyBookStore}>{storyFn()}</Provider>
}
