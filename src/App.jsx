import {Fragment, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

const baseURL = "https://todo-gabbenos-api.fly.dev";

const endpoints = {
  todos: "/gettodos",
  addTodo: "/addtodo",
  deleteTodo: "/deletetodos",
  updateTodo: "/updatetodos",
};
const requestHeaders = {
  "Content-Type": "application/json",
};

const postMethod = {
  method: "POST",
  headers: requestHeaders,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodoInput, setAddTodoInput] = useState("");

  useEffect(() => {
    fetch(baseURL + endpoints.todos, postMethod)
      .then((res) => res.json())
      .then((data) => setTodos(data.filter((todo) => !!todo)));
  }, []);

  const handleDelete = () => {
    console.log("delete");
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
    }).then((res) => res.json());
    setTodos([...todos, newTodo]);
  };

  console.log(todos);

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
        {todos.map(
          (todo) =>
            todo && (
              <li key={todo.id}>
                <h2>{todo.content}</h2>
                <p>{todo.done ? "Completed" : "Not Completed"}</p>
                <p>{todo.date}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handledit}>Edit</button>
                <button onClick={handleDone}>Done</button>
              </li>
            )
        )}
      </ul>
    </Fragment>
  );
}

export default App;
