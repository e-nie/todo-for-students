import {useState} from "react";
import {todoListId1, todoListId2} from "../id-utils";
import {v1} from "uuid";
import {TodolistType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../../../features/TodolistsList/todolists-reducer";

export function useTodolists(onTodolistRemoved: (id: string) => void,
                             onTodolistAdded: (id: string) => void
) {

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todoListId1, title: "What to learn", filter: "all",addedDate: ' ',
            order: 0},
        {id: todoListId2, title: "What to buy", filter: "all",addedDate: ' ',
            order: 0}
    ])

    function changeFilter(todoListId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        onTodolistRemoved(id)
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newtodoListId = v1();
        let newTodolist: TodolistDomainType = {id: newtodoListId, title: title, filter: 'all',addedDate: ' ',
            order: 0};
        setTodolists([newTodolist, ...todolists]);
        onTodolistAdded(newtodoListId)
    }


    return {
        todolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist

    }
}
