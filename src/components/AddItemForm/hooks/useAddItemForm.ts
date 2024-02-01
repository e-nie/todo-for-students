import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
    const [title, setNewTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            onItemAdded(title.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }


    return {
        title,
        onChangeHandler,
        onKeyPressHandler,
        addItemHandler,
        error
    }
}
