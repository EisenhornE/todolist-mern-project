import { useState } from "react"
import { useListContext } from '../hooks/useTodoListContext'

const TodoListForm = () => {
    const { dispatch } = useListContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duedate, setDueDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setDueDate('')
            setError(null)
            setEmptyFields([])
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
                className = {emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value = {description}
                className = {emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Due Date:</label>
            <input 
                type="text"
                onChange={(e) => setDueDate(e.target.value)}
                value = {duedate}
                className = {emptyFields.includes('duedate') ? 'error' : ''}
            />
            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoListForm