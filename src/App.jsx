import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function useSemiPersistentState(key, value) {
  let [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);
  useEffect(() => localStorage.setItem("savedTodoList", JSON.stringify(todoList)), [todoList]);

  return [todoList, setTodoList]
}

function App() {
  let [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList([newTodo, ...todoList])
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </>
  );
}

export default App
