import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from "./App.module.css";
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

  // Post new todo to AirTable
  async function postData(newTodo) {
    const payload = {
      records : [
        {
          fields : {
            Title : `${newTodo.title}`
          }
        }
      ]
    }

    let options = {
      method : "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(payload)
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      
      const data = await response.json();

      // Create new todo object with given ID from AirTable
      const newTodoObj = {
        title : data.records[0].fields.Title,
        id : data.records[0].id
      } 

      return newTodoObj;
      
    } catch (error) {
      console.log(error);
    }
  }

  // Retrieve new todo object from AirTable with updated ID and update our todolist
  function addTodo(newTodo) {
    postData(newTodo).then((todoObj) => {
      setTodoList([todoObj, ...todoList]);
    })
  }

  function removeTodo(id) {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }

  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <div className={styles.formImgContainer}>
          <div className={styles.todoForm}>
            <h1>Todo List</h1>
            <Routes>
              <Route path='/' element={
                <>
                  <AddTodoForm onAddTodo={addTodo}/>
                  {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
                </>
              }/>
              <Route path='/new' element={
                <h1>Todo List</h1>
              }/>
            </Routes> 
          </div>
          <div className={styles.imgPlaceHolder}></div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
