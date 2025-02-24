import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from "./App.module.css";
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import finalBossCat from './assets/cat/levelOneCat.png';
import Pet from './components/petComponents/Pet';

function App() {
  // TodoList state
  const [todoList, setTodoList] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Count of completed todos
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  // CompletedTodosCount's id
  const [completedTodosCountId, setCompletedTodosCountId] = useState("");

  // Fetching data from AirTable
  async function fetchData() {
    let options = {
      method : "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      
      const data = await response.json();

      // Stores the number of completed todos (first cell) and its id, and excludes it from fetching
      setCompletedTodosCount(Number(data.records[0].fields.Title));
      setCompletedTodosCountId(data.records[0].id);
      // console.log("completedTodosCountIdFetch: ", completedTodosCountId)
      // console.log("data: ", data)
      const filteredData = data.records.slice(1);

      // Sort todos in ascending alphabetical order by Title
      const sortedTodos = filteredData.sort(
        (todoA, todoB) => {
          if (todoA.fields.Title < todoB.fields.Title) {
            return -1;
          } else if (todoA.fields.Title > todoB.fields.Title) {
            return 1;
          } else {
            return 0;
          }
        }
      )
      const todos = sortedTodos.map((todo) => ({
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

  // Delete todo from AirTable
  async function removeData(todoId) {
    let options = {
      method : "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type' : 'application/json'
      }};

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${todoId}`;
    
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      const data = await response.json();
      console.log("Deleted record successfully: ", data);
      
    } catch (error) {
      console.log("Failed to delete record: ", error);
    }
  }

  // Remove todo from Airtable and update our todolist without the removed todo.
  async function removeTodo(id) {
    await removeData(id);
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
    // console.log("Completed count: ", completedTodosCount)
  }

  async function updateCompletedTodosCount(id, newCount) {
    console.log("id: ", id);
    console.log("newCount: ", newCount);
    const payload = {
      records : [
        {
          id : id,
          fields : {
            "Title" : `${newCount}`
          }
        }
      ]
    }

    let options = {
      method : "PATCH",
      headers : {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(payload)
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      const data = await response.json();
      console.log("Updated completed todos count: ", data);
      
    } catch (error) {
      console.log("Failed updating completed todos count: ", error);
    }
        
  }
  
  // Remove todo from Airtable and update our todolist without the removed todo.
  async function completeTodo(id) {
    await removeData(id);
    // console.log("Completed count before: ", completedTodosCount)
    setCompletedTodosCount(completedTodosCount + 1);
    // console.log("completedTodosCountId: ", completedTodosCountId);
    updateCompletedTodosCount(completedTodosCountId, completedTodosCount + 1);
    // console.log("Completed count: ", completedTodosCount)
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
                  {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} onCompleteTodo={completeTodo}/>}
                </>
              }/>
              <Route path='/new' element={
                <h1>Todo List</h1>
              }/>
            </Routes> 
          </div>
          <div className={styles.imgPlaceHolder}><Pet/></div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
