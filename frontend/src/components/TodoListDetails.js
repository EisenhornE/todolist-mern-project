import { useListContext } from "../hooks/useTodoListContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TodoListDetails = ({ todoList }) => {
    const { dispatch } = useListContext()

    const handleClick = async () => {
        const response = await fetch('/api/todoList/' + todoList._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }

    return(
        <div className="TodoList-Details">
            <h4>{todoList.title}</h4>
            <p><strong>Description: </strong>{todoList.description}</p>
            <p><strong>Due By:  </strong>{todoList.duedate}</p>
            <p>{formatDistanceToNow(new Date(todoList.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default TodoListDetails