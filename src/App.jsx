import { useEffect, useState } from 'react'
import styles from "./App.module.css";
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationButtons from './components/NavigationButtons';
import Pet from './components/petComponents/Pet';
import cashRegisterSound from "./assets/cat/cash_sound.wav"

function App() {
  // TodoList state
  const [todoList, setTodoList] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Count of completed todos
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  // CompletedTodosCount's id
  const [completedTodosCountId, setCompletedTodosCountId] = useState("");
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  // Reset button state
  const [showResetLevelButton, setShowResetLevelButton] = useState(false);

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

  // Display reset level button if completed todos reaches 16
  useEffect(() => {
    if (completedTodosCount - 1 >= 15) {
      setShowResetLevelButton(true);
    } else {
      setShowResetLevelButton(false);
    }
  }, [completedTodosCount]); 

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
      
    } catch (error) {
      console.log("Failed to delete record: ", error);
    }
  }

  // Remove todo from Airtable and update our todolist without the removed todo.
  async function removeTodo(id) {
    await removeData(id);
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }

  async function updateCompletedTodosCount(id, newCount) {
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
      
    } catch (error) {
      console.log("Failed updating completed todos count: ", error);
    }
        
  }
  
  // Mark todo as completed, removes todo and updates AirTable with the total number of completed todos.
  async function completeTodo(id) {
    await removeData(id);
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
    const sound = new Audio(cashRegisterSound);

    /* 
    Show popup when completed todos count reaches 15, 
    else marks todo as completed, removes todo and updates 
    AirTable with the total number of completed todos.
    */
    if (completedTodosCount == 15) {
      setShowPopup(true); 
      setCompletedTodosCount(completedTodosCount + 1);
      updateCompletedTodosCount(completedTodosCountId, completedTodosCount + 1);
    } else {
      if (!showResetLevelButton) {
        sound.play();
      }
      
      setCompletedTodosCount(completedTodosCount + 1);
      updateCompletedTodosCount(completedTodosCountId, completedTodosCount + 1);
    }
  }

  // Button to reset pet level to one
  function resetPetLevel() {
    setCompletedTodosCount(1);
    updateCompletedTodosCount(completedTodosCountId, 1);
    setShowPopup(false);
    setShowResetLevelButton(false);
  }

  // Button to close the popup and show the reset button
  function closePopup() {
    setShowPopup(false);
    setShowResetLevelButton(true);
  }

  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <div className={styles.navButtonsRoutesContainer}>
          <NavigationButtons/>
          <Routes>
            <Route path='/' element={
              <div className={styles.formImgContainer}>
                <div className={styles.todoForm}>
                  {showResetLevelButton && <button className={styles.resetButton} onClick={resetPetLevel}>Reset to Level 1</button>}
                  <h1>Todo List</h1>
                  {showPopup && (
                    <div className={styles.popup}>
                      <p className={styles.popupText}>🎉 Yay! Your pet has reached the final level! 🎉</p>
                      <button className={styles.resetButton} onClick={resetPetLevel}>Reset to Level 1</button>
                      <button className={styles.closePopupButton} onClick={closePopup}>Back</button>
                    </div>
                  )}
                  <>
                    <AddTodoForm onAddTodo={addTodo}/>
                    {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} onCompleteTodo={completeTodo}/>}
                  </>
                </div>
                <Pet completedTodosCount={completedTodosCount}/>
              </div>
            }/>
            <Route path='/pet' element={
                <div className={styles.petContainer}><Pet completedTodosCount={completedTodosCount}/></div>
            }/>
          </Routes> 
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
