import {useState} from "react";
import {todoListId1, todoListId2} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:todoListId1, description: '', startDate: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS",  status: TaskStatuses.Completed, todoListId:todoListId1, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low }
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId:todoListId2, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId:todoListId2, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low}
        ]
    });


    function removeTask(id: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todoListId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, todoListId:todoListId1, description: '', startDate: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low}
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todoListId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(todoListId: string, taskId: string, status: TaskStatuses) {
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId]
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.status = status;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId];
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

    function addStateForNewTodolist(newtodoListId: string) {
        setTasks({...tasks, [newtodoListId]: []})
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
