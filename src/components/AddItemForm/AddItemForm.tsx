import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}


export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItemHandler
    } = useAddItemForm(addItem)


    return <div>
        <TextField
            variant = {'outlined'}
            disabled = {disabled}
            label = {'Enter your text...'}
            value = {title}
            onChange = {onChangeHandler}
            onKeyPress = {onKeyPressHandler}
            error = {!!error}
            helperText = {error}
        />
        <IconButton color = 'primary' onClick = {addItemHandler} disabled={disabled}>
            <AddTaskIcon />
        </IconButton>
    </div>
})


