import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../features/TodolistsList/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
    title: 'App Stories',
    component: App,
    parameters: {
             layout: 'centered',
    },
    tags: ['autodocs'],
    decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppBaseExample = (props:any) =>  {
    // render: () => <Provider store={store}><App/></Provider>
    return (<App/>)
};




