import {Fragment, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";


const backendURL = {
  remote: "https://todo-gabbenos-api.fly.dev",
  local: "http://localhost:8080",
};

const baseURL = backendURL.local;

const endpoints = {
  todos: "/gettodos",
  addTodo: "/addtodo",
  deleteTodo: "/deletetodo",
  updateTodo: "/updatetodos",
};
const requestHeaders = {
  "Content-Type": "application/json",
};

const postMethod = {
  method: "POST",
  headers: requestHeaders,
};

const getMethod = {method: "GET", headers: requestHeaders};

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodoInput, setAddTodoInput] = useState("");

  useEffect(() => {
    fetch(baseURL + endpoints.todos, getMethod)
      .then((res) => res.json())
      .then((data) => setTodos(data ?? []));
  }, []);

  const handleDelete = (e) => {
    const {id} = e.target;
    console.log(id);
    fetch(baseURL + endpoints.deleteTodo, {
      ...postMethod,
      body: JSON.stringify({id}),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data ?? []);
      });
  };

  const handledit = () => {
    console.log("edit");
  };

  const handleDone = () => {
    console.log("done");
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const newTodo = {
      content: addTodoInput,
      done: false,
      date: date.toISOString(),
      id: uuidv4(),
    };
    console.log(addTodoInput);
    fetch(baseURL + endpoints.addTodo, {
      ...postMethod,
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data ?? []);
      });
  };

  const handleAddTodoInput = (e) => setAddTodoInput(e.target.value);

  return (
    <Fragment>
      <h1> Hello World! </h1>
      <h2> Add Todo </h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          value={addTodoInput}
          onChange={handleAddTodoInput}
          placeholder="Add Todo"
        />
        <button type="submit">Add</button>
      </form>
      <h2> Todos </h2>
      <ul>
        {todos.length > 0 ? (
          todos.map(
            (todo) =>
              todo && (
                <li key={todo.id}>
                  <h2>{todo.content}</h2>
                  <p>{todo.done ? "Completed" : "Not Completed"}</p>
                  <p>{todo.date}</p>
                  <button id={todo.id} onClick={handleDelete}>
                    Delete
                  </button>
                  <button onClick={handledit}>Edit</button>
                  <button onClick={handleDone}>Done</button>
                </li>
              )
          )
        ) : (
          <p>No Todos</p>
        )}
      </ul>
    </Fragment>
  );
}

export default App;
