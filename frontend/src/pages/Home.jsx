import { useEffect } from "react"
import { useListContext } from '../hooks/useTodoListContext'

// components

import TodoListDetails from '../components/TodoListDetails'
import TodoListForm from "../components/TodoListForm"

const Home = () => {
    const {todoList, dispatch} = useListContext()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch('/api/todoList')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_TASK', payload: json})
            }
        }

        fetchTask()
    }, [dispatch])

    return(
        <div className="home">
            <div className="list">
                {todoList && todoList.map((todoList) => (
                    <TodoListDetails key={todoList._id} todoList={todoList} />
                ))}
            </div>
            <TodoListForm />
        </div>
    )
}

export default Home