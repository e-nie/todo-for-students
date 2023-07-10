import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    //add task with enter
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }


                        return <li key = {t.id}
                        className={t.isDone ? 'isDone': ''}
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
