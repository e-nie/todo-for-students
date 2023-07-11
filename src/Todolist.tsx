import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId:string)=> void
}

const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    //add task with enter
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick = {removeTodolist}>X</button>
            </h3>
            <div>
                <input value = {newTaskTitle}
                       onChange = {onChangeHandler}
                       onKeyPress = {onKeyPressHandler}
                       className = {error ? 'error' : ''}
                />
                <button onClick = {addTask}>+</button>
            </div>
            {error && <div className = 'errorMessage'>{error}</div>}
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }


                        return <li key = {t.id}
                                   className = {t.isDone ? 'isDone' : ''}
                        >
                            <input type = "checkbox"
                                   onChange = {onChangeHandler1}
                                   checked = {t.isDone} />
                            <span>{t.title}</span>
                            <button onClick = {onRemoveHandler}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className = {props.filter === 'all' ? 'activeFilter' : ''}
                        onClick = {onAllClickHandler}>All
                </button>
                <button className = {props.filter === 'active' ? 'activeFilter' : ''}
                        onClick = {onActiveClickHandler}>Active
                </button>
                <button className = {props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick = {onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
