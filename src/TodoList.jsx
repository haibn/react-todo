import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";

function TodoList({todoList, onRemoveTodo}) {
    return (
        <ul>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo}/>;
            })}
        </ul>
    )
}

export default TodoList