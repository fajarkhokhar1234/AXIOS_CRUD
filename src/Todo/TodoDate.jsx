import { useState, useEffect } from "react"
const TodoDate = () => {

    const [date, setDate] = useState("")
    useEffect(() => {
        const interval = setInterval(()=>{
          const now = new Date() 
          const formattedDate = now.toLocaleDateString()
          const formattedTime = now.toLocaleTimeString()
          setDate(`${formattedDate} - ${formattedTime}`)
        },1000)
        return () => clearInterval(setDate)
    },[])


    return <h2 className="date-time">{date}</h2>

}

export default TodoDate