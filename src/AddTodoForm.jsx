function AddTodoForm(props) {
    let {onAddTodo} = props;

    function handleAddTodo(event) {
        event.preventDefault();
        let todoTitle;
        todoTitle = event.target[0].value;
        onAddTodo(todoTitle);
        console.log(todoTitle);
        event.target.reset();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm