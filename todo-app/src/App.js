import React, { useState, useEffect } from 'react';
import CreateTodo from './Components/CreateTodo';
import Todo from './Components/Todo';
import './index.css';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from './firebase';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from Firestore when the component mounts
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  // Function to update the todo title
  const handleEdit = async (todo, newSubject) => {
    await updateDoc(doc(db, "todos", todo.id), { Subject: newSubject });
    // Update the local state to reflect the change
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, Subject: newSubject } : t))
    );
  };

  // Function to toggle the todo's completion status
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    // Update the local state to reflect the change
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, completed: !todo.completed } : t))
    );
  };

  // Function to delete a todo from Firestore
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    // Update the local state to remove the deleted todo
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1 className="app-title">Todo Application</h1>
      <CreateTodo />
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
