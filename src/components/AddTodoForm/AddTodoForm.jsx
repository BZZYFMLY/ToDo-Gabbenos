import React, {useState, useContext} from "react";
import {v4 as uuidv4} from "uuid";
import {baseURLLocal} from "../../api/apiURLs";
import {apiEndpoints} from "../../api/apiEndpoints";
import {postMethod} from "../../api/apiMethods";

import {TodoContext} from "../../App";

const AddTodoFrom = () => {
  const {setTodos, baseURL} = useContext(TodoContext);

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
    fetch(baseURL + apiEndpoints.addTodo, {
      ...postMethod,
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
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
