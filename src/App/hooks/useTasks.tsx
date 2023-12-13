import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todolistId:todolistId1, description: '', startDate: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS",  status: TaskStatuses.Completed, todolistId:todolistId1, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low }
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId:todolistId2, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todolistId:todolistId2, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, todolistId:todolistId1, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low}
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(todolistId: string, taskId: string, status: TaskStatuses) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId]
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.status = status;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function completelyRemoveTasksForTodolist(id: string) {
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addStateForNewTodolist(newTodolistId: string) {
        setTasks({...tasks, [newTodolistId]: []})
    }


    return {
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    }
}
