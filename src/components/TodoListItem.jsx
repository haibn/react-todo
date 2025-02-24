import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({todo, onRemoveTodo, onCompleteTodo}) {
    return (
        <li className={style.ListItem}>{todo.title} 
        <button className={style.button} onClick={() => onCompleteTodo(todo.id)}>Completed</button>
        <button className={style.button} onClick={() => onRemoveTodo(todo.id)}>Remove</button>
        </li>
    );
}

TodoListItem.propTypes = {
    todo : PropTypes.object.isRequired,
    onRemoveTodo : PropTypes.func,
    onCompleteTodo: PropTypes.func
}

export default TodoListItem;