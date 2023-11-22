import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {useCallback} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolists-reducer";
import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";

export const useAppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    console.log(todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        // debugger
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return {
        todolists,
        tasks,
        addTask,
        addTodolist,
        changeFilter,
        changeStatus,
        changeTaskTitle,
        removeTask,
        removeTodolist,
        changeTodolistTitle,




    }
}
