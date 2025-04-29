import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the todo list from your backend
    fetch('http://localhost:3000/todos')  // Adjust the URL to your backend if needed
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

