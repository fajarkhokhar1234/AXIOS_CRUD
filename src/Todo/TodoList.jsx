import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const TodoList = ({ data, checked, onHandleDelete, onHandleChecked}) => {

    return(
        <li className="todo-item">
        <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
        <button className="check-btn" onClick={() => onHandleChecked(data)}><IoIosCheckmarkCircle  /></button>
        <button className="delete-btn"  onClick={() => onHandleDelete(data)}><MdDeleteForever /></button>
       </li>
    )
}
export default TodoList