import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList({todoList, onRemoveTodo, onCompleteTodo}) {
    return (
        <ul>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} onCompleteTodo={onCompleteTodo}/>;
            })}
        </ul>
    )
}

TodoList.propTypes = {
    todoList : PropTypes.array.isRequired,
    onRemoveTodo : PropTypes.func,
    onCompleteTodo: PropTypes.func
}

export default TodoList