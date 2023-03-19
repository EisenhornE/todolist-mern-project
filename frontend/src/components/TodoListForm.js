import { useState } from "react"
import { useListContext } from '../hooks/useTodoListContext'

const TodoListForm = () => {
    const { dispatch } = useListContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duedate, setDueDate] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo = {title, description, duedate}

        const response = await fetch('/api/todoList', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setDueDate('')
            setError(null)
            console.log('new task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>

            <label>Task Name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value = {description}
            />

            <label>Due Date:</label>
            <input 
                type="text"
                onChange={(e) => setDueDate(e.target.value)}
                value = {duedate}
            />
            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoListForm