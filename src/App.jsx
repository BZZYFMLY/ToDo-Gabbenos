import {useState, useEffect, createContext} from "react";

import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import {baseURLLocal, baseURLRemote} from "./api/apiURLs";
import {apiEndpoints} from "./api/apiEndpoints";
import {getMethod} from "./api/apiMethods";

const baseURL = baseURLLocal;

export const TodoContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(baseURL + apiEndpoints.todos, getMethod)
      .then((res) => res.json())
      .then((data) => setTodos(data.filter((todo) => !!todo)));
  }, []);

  return (
    <TodoContext.Provider value={{todos, setTodos, baseURL}}>
      <h1>Todo App Made with React</h1>
      <h2>Add Todo</h2>
      <AddTodoForm />
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;
