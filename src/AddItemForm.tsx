import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const  AddItemForm = React.memo((props: AddItemFormPropsType)=> {
    console.log('AddItemForm was called');
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        {/*<input value = {newTaskTitle}*/}
        {/*       onChange = {onChangeHandler}*/}
        {/*       onKeyPress = {onKeyPressHandler}*/}
        {/*       className = {error ? 'error' : ''}*/}
        {/*/>*/}

        <TextField
            variant = {'outlined'}
            label = {'Enter your text...'}
            value = {newTaskTitle}
            onChange = {onChangeHandler}
            onKeyPress = {onKeyPressHandler}
            error = {!!error}
            helperText = {error}
        />
        <IconButton color = 'primary' onClick = {addTask}>
            <AddTaskIcon />
        </IconButton>

    </div>
})
