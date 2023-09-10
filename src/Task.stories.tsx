import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import React, { useState} from "react";

import {action} from '@storybook/addon-actions'


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
    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        task: {id: '45dss', title: 'Just title', isDone: true},
        todolistId: '12jfkdjf'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '45dvcss', title: 'Just another title', isDone: false},
    }
}

export const TaskPresentation = () => {
    const [task, setTask] = useState({id: '45dss', title: 'CSS', isDone: false})
    return <Task
        task = {task}
        removeTask = {action('Remove task')}
        changeTaskStatus = {() => {
            setTask({...task, isDone: !task.isDone})
        }}
        changeTaskTitle = {(_, title) => {
            setTask({...task, title: title})
        }}
        todolistId = {'45dvcss'}
        isDone={false}
    />
}

// export const TaskPresentationStory: Story = {
//     render: () => <TaskPresentation/>
// };
