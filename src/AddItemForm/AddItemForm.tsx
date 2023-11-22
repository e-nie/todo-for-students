import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem
    } = useAddItemForm(props.addItem)


    return <div>
             <TextField
            variant = {'outlined'}
            label = {'Enter your text...'}
            value = {title}
            onChange = {onChangeHandler}
            onKeyPress = {onKeyPressHandler}
            error = {!!error}
            helperText = {error}
        />
        <IconButton color = 'primary' onClick = {addItem}>
            <AddTaskIcon />
        </IconButton>
    </div>
})


