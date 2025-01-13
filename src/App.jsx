import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
  // TodoList state
  const [todoList, setTodoList] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load initial todoList state from saved local storage.
  useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        data: {
          todoList: JSON.parse(localStorage.getItem("savedTodoList")) || []
        }
      }), 2000);
    })
    fetchData.then((response) => {
      setTodoList(response.data.todoList);
      setIsLoading(false);
    });
  }, []);

  // Update local storage with most recent todoList
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList([newTodo, ...todoList])
  }

  function removeTodo(id) {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
    </>
  );
}

export default App
