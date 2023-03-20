import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
    switch(action.type){
        case 'SET_TASK':
            return{
                todoList: action.payload
            }
        case 'CREATE_TASK':
            return{
                todoList: [action.payload, ...state.todoList]
            }
        case 'DELETE_TASK':
            return{
                todoList: state.todoList.filter((w) => w._id !== action.payload)
            }
        default:
            return state
    }
}

export const ListContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(listReducer, {
        todoList: null
    })

    return(

        <ListContext.Provider value ={{...state, dispatch}} >

        { children }

        </ListContext.Provider>
    )

}