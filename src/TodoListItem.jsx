import style from "./TodoListItem.module.css";

function TodoListItem({todo, onRemoveTodo}) {
    return (
        <li className={style.ListItem}>{todo.title} <button className={style.button} onClick={() => onRemoveTodo(todo.id)}>Remove</button></li>
    );
}

export default TodoListItem;