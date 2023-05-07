import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";

import {endpoints} from "../../api/endpoints";
import {backendURL} from "../../api/backendURL";
import {postMethod} from "../../api/methods";

const baseURL = backendURL.local;

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
