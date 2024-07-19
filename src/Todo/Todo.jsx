import { useState } from "react"
import "./Todo.css"
import TodoDate from "./TodoDate"
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";


const todoKey = "Todo"
const Todo = () => {

    // Form Submit Functionality
    const [task, setTask] = useState( () => {
        const rawTodo = localStorage.getItem(todoKey)
        if(!rawTodo) return[]
        return JSON.parse(rawTodo)
    })
    const handleFormSubmit = (input) =>{
        const { id, content, checked } = input

        if(!content) return;

        // 1st Method
        // if(task.includes(input)) {
        //     setinput("")
        //     return
        // }

        // 2nd Method
        const todoMatched = task.find((curTask) => curTask.content === content)
        if(todoMatched) return

        setTask((prev) => [...prev, { id, content, checked }])
        
    }

    // Add data to localStorage
    localStorage.setItem(todoKey, JSON.stringify(task))
    // Delete Functionality
    const deleteTask = (value) => {
       const updatedTask = task.filter((curTask) => curTask.content !== value)
       setTask(updatedTask)
    }

    // DeleteAll Functionality
    const clearAll = () => { 
        setTask([]) 
    }
    
    //Check Funtionality
    const handleChecked = (content) => {
        const updatedTask = task.map( (curTask) => {
            if(curTask.content === content){
                return {...curTask, checked:!curTask.checked}
            }
            else{
                return curTask
            }
        })
        setTask(updatedTask)
    } 
    return(
     <section className="todo-container">
        {/* header */}
        <header>
            <h1>Todo List</h1>
        </header>
        
        {/* Date & Time */}
        <TodoDate />
 
        {/* Form */}
        <TodoForm onAddTodo={handleFormSubmit}/>

        {/* Show List */}
        <section className="myUnOrdList">
            <ul>
                {
                    task.map((curTask,) =>{
                       return (
                       <TodoList 
                       key={curTask.id} 
                       data={curTask.content}
                       checked={curTask.checked} 
                       onHandleDelete={deleteTask} 
                       onHandleChecked={handleChecked} />
                       )
                    })
                }
            </ul>
        </section>

        {/* DeleteAll Function */}
        <section>
            <button className="clear-btn" onClick={clearAll}>Clear All</button>
        </section>
     </section>
    )
}
export default Todo