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

  // Fetching data from AirTable
  async function fetchData() {
    let options = {
      method : "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      
      const data = await response.json();
      const todos = data.records.map((todo) => ({
        title : todo.fields.Title,
        id: todo.id
      }));
      console.log(todos);

      setTodoList(todos);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  // Load initial todoList state from saved local storage.
  useEffect(() => {
    fetchData();
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
