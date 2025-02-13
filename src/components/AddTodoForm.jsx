import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css"
import PropTypes from "prop-types";

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
        <div>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}> Title </InputWithLabel>
                <button type="submit" className={styles.button}>Add</button>
            </form>
        </div>
    )
}

AddTodoForm.propTypes = {
    onAddTodo : PropTypes.func
}

export default AddTodoForm