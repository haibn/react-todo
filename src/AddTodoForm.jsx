import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({onAddTodo}) {
    let [todoTitle, setTodoTitle] = useState("");

    function handleTitleChange(event) {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo({
            title: todoTitle,
            id: Date.now()
        });
        setTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}> Title </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm