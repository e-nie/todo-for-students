import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import App from './App'
import StoryRouter from 'storybook-react-router'
import { MemoryRouter } from 'react-router'
import { ReduxStoreProviderDecorator } from '../features/TodolistsList/ReduxStoreProviderDecorator'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// @ts-ignore
const decorators = [
  (Story: any) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
  ReduxStoreProviderDecorator,
]
const meta: Meta<typeof App> = {
  title: 'App Stories',
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: decorators,
}

export default meta
type Story = StoryObj<typeof App>

export const AppBaseExample = (props: any) => {
  // render: () => <Provider store={store}><App/></Provider>
  return <App demo={true} />
}
