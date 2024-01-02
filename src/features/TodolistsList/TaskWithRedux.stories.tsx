import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {action} from '@storybook/addon-actions'
import {Task} from "./Todolist/Task/Task";
import {initialGlobalState, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {AppRootStateType} from "../../app/store";
import {useSelector} from "react-redux";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],

};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskWithReduxPresent = () => {
    let task  = useSelector<AppRootStateType, TaskType>(state=> state.tasks['todoListId1'][0])
    if(!task) task = {id: '3', title: 'tea' , status:TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''}
    return <Task task={task} todoListId='todoListId1'/>
}

export const TaskWithReduxStory: Story = {
    render:() => <TaskWithReduxPresent/>
}




