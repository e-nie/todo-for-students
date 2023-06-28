import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React JS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks // ❗️

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    return (
        <div className = "App">
            <Todolist title = 'What to learn'
                      tasks = {tasksForTodolist}
                      removeTask = {removeTask}
                      changeFilter = {changeFilter}
            />
        </div>

    );
}

export default App;
