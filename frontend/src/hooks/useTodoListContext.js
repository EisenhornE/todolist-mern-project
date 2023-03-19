import { ListContext } from '../context/TodoListContext'
import { useContext } from "react";


export const useListContext = () => {
    const context = useContext(ListContext)

    if(!context){
        throw Error('useListContext must be used inside a useListContextProvider');
    }

    return context
}