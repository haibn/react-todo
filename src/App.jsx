import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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

function App() {
  return (
    <>
      <h1>Todo List</h1>

      <ul>
        {todoList.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App
