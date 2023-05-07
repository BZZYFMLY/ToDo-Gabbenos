import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";

const AddTodoFrom = ({todos, setTodos}) => {
  const [addTodoInput, setAddTodoInput] = useState("");

  const handleAddTodoInput = (e) => setAddTodoInput(e.target.value);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const newTodo = {
      content: addTodoInput,
      done: false,
      date: date.toISOString(),
      id: uuidv4(),
    };
    // fetch(baseURL + endpoints.addTodo, {
    //   ...postMethod,
    //   body: JSON.stringify(newTodo),
    // }).then((res) => res.json());
    setTodos([...todos, newTodo]);
    setAddTodoInput("");
  };

  return (
    <form onSubmit={handleAddSubmit}>
      <input
        type="text"
        name="addTodoInput"
        value={addTodoInput}
        onChange={handleAddTodoInput}
        placeholder="Add Todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoFrom;
