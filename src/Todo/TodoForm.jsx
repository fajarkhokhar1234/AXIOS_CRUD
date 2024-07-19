import { useState } from "react"

const TodoForm = ({ onAddTodo }) =>{

    const [input, setinput] = useState("")
    const handleInputField = (value) =>{
      setinput({id:value, content:value, checked:false})
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        onAddTodo(input)
        setinput({ id:"", content:"", checked:false })
    }
    return(
        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div>
                <input type="text"  autoComplete="off" placeholder="enter task here"
                className="todo-input"
                value={input.content}
                onChange={ (e) => handleInputField(e.target.value)} />
                </div>
                <div>
                <button type="submit" className="todo-btn">Add Task</button>
                </div>
            </form>
        </section> 
    )
}
export default TodoForm