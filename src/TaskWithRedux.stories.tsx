import type {Meta, StoryObj} from '@storybook/react';
import {Task, TaskPropsType} from "./Task";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {action} from '@storybook/addon-actions'
import {TaskWithRedux} from "./TaskWithRedux";
import {initialGlobalState, ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";
import {AppRootStateType} from "./state/store";
import {useSelector} from "react-redux";
import {TaskType} from "./Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/TaskWithRedux',
    component: TaskWithRedux,
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
type Story = StoryObj<typeof TaskWithRedux>;

export const TaskWithReduxPresent = () => {
    let task  = useSelector<AppRootStateType, TaskType>(state=> state.tasks['todolistId1'][0])
    if(!task) task = {id:'oppo', title: 'Default task', isDone: false}
    return <TaskWithRedux task={task} todolistId='todolistId1'/>
}

export const TaskWithReduxStory: Story = {
    render:() => <TaskWithReduxPresent/>
}




