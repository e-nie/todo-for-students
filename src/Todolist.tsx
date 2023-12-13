import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";
// import {ChangeTaskStatusPayloadType} from "./state/tasks-reducer";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist was called');

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks // ❗️

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3><EditableSpan title = {props.title} onChange = {changeTodolistTitle} />
                <IconButton onClick = {removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem = {addTask} />
            <div>
                {
                    props.tasks.map(t => <Task
                        task = {t}
                        changeTaskStatus = {props.changeTaskStatus}
                        changeTaskTitle = {props.changeTodolistTitle}
                        removeTask = {props.removeTask}
                        todolistId = {props.id}
                        key = {t.id}
                    />)
                }


            </div>
            <div>
                <Button variant = {props.filter === 'all' ? 'contained' : 'text'}
                        onClick = {onAllClickHandler}>All
                </Button>
                <Button color = 'primary' variant = {props.filter === 'active' ? 'contained' : 'text'}
                        onClick = {onActiveClickHandler}>Active
                </Button>
                <Button color = 'secondary' variant = {props.filter === 'completed' ? 'contained' : 'text'}
                        onClick = {onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});



