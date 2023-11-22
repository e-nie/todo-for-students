import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {action} from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            action: 'clicked',
            description: 'Button clicked inside form'
        },
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {

};

const  AddItemFormWithError= (props: AddItemFormPropsType) =>  {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>('Title is required')

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
}

export const AddItemFormWithErrorStory: Story = {
    render: (args) => <AddItemFormWithError addItem={action('Button clicked inside form')}/>
};

