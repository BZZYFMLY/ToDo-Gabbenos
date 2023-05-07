import {Fragment, useState, useEffect} from "react";

import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([
    {
      content: "test",
      done: false,
      date: "2021-09-01T15:00:00.000Z",
      id: "1",
    },
    {
      content: "test2",
      done: false,
      date: "2021-09-01T15:00:00.000Z",
      id: "2",
    },
  ]);

  // useEffect(() => {
  //   fetch(baseURL + endpoints.todos, postMethod)
  //     .then((res) => res.json())
  //     .then((data) => setTodos(data.filter((todo) => !!todo)));
  // }, []);

  return (
    <Fragment>
      <h1> Hello World! </h1>
      <h2> Add Todo </h2>
      <AddTodoForm todos={todos} setTodos={setTodos} />
      <h2> Todos </h2>
      <TodoList todos={todos} setTodos={setTodos} />
    </Fragment>
  );
}

export default App;
