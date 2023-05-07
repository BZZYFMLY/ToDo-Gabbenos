import {Fragment, useState, useEffect} from "react";

import TodoLost from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

import {endpoints} from "./api/endpoints";
import {backendURL} from "./api/backendURL";
import {getMethod, postMethod} from "./api/methods";

const baseURL = backendURL.local;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(baseURL + endpoints.todos, getMethod)
      .then((res) => res.json())
      .then((data) => setTodos(data ?? []));
  }, []);

  return (
    <Fragment>
      <h1> Hello World! </h1>
      <h2> Add Todo </h2>
      <AddTodoForm setTodos={setTodos} />
      <h2> Todos </h2>
      {todos.length > 0 ? (
        <TodoLost todos={todos} setTodos={setTodos} />
      ) : (
        <p>No Todos</p>
      )}
    </Fragment>
  );
}

export default App;
