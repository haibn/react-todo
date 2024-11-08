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
                return <li key={item.id}>{item.title}</li>;
            })}
        </ul>
    )
}

export default TodoList