import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css"

function AddTodoForm({onAddTodo}) {
    let [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo({
            title: todoTitle
        });
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}> Title </InputWithLabel>
            <button type="submit" className={styles.button}>Add</button>
        </form>
    )
}

export default AddTodoForm