import TodoListItem from "./TodoListItem";

let todoList = [
    {
      id: 1,
      title: "Complete assignment"
    },
    {
      id: 2,
      title: "Turn in assignment"
    },
    {
      id: 3,
      title: "Start new assignment"
    }
  ];

function TodoList() {
    return (
        <ul>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item}/>;
            })}
        </ul>
    )
}

export default TodoList