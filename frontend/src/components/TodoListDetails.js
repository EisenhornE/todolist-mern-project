const TodoListDetails = ({ todoList }) => {

    // const handleClick = async () => {
    //     const response = await fetch('/api/todoList/' + todoList._id, {
    //         method: 'DELETE'
    //     })
    //     const json = await response.json()

    //     if(response.ok) {

    //     }
    // }

    return(
        <div className="TodoList-Details">
            <h4>{todoList.title}</h4>
            <p><strong>Description: </strong>{todoList.description}</p>
            <p><strong>Due By:  </strong>{todoList.duedate}</p>
            <p>{todoList.createdAt}</p>
            {/* <span onClick={handleClick}>Delete</span> */}
        </div>
    )
}

export default TodoListDetails