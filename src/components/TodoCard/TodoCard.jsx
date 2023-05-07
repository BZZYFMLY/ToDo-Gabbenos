import {useState} from "react";

import Modal from "../Modal/Modal";

import {endpoints} from "../../api/endpoints";
import {backendURL} from "../../api/backendURL";
import {postMethod} from "../../api/methods";

const baseURL = backendURL.local;

const TodoCard = ({todo, setTodos}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleDelete = (e) => {
    const {id} = e.target.dataset;
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

  const handleDone = (e) => {
    const {id} = e.target.dataset;
    const todoToUpdate = todos.find((todo) => todo.id === id);

    fetch(baseURL + endpoints.updateTodo, {
      ...postMethod,
      body: JSON.stringify({...todoToUpdate, done: !todoToUpdate.done}),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data ?? []);
      });
  };

  const handleEditContent = (e) => setEditContent(e.target.value);

  const handleSave = () => {
    setTodos((prev) => {
      return prev.map((todoFromList) => {
        return todoFromList.id === todo.id
          ? {...todoFromList, content: editContent}
          : todoFromList;
      });
    });
  };

  return (
    <>
      <li>
        <h2>{todo?.content}</h2>
        <p>{todo?.done ? "Completed" : "Not Completed"}</p>
        <p>{todo?.date}</p>
        <p>{todo?.id}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handledit}>Edit</button>
        <button onClick={handleDone}>Done</button>
      </li>
      <Modal
        handleOk={handleSave}
        open={modalOpen}
        setOpen={setModalOpen}
        title="Edit todo"
      >
        <label htmlFor="editContent">Todo content</label>
        <input
          type="text"
          name="editContent"
          placeholder="Add the new content"
          onInput={handleEditContent}
        />
      </Modal>
    </>
  );
};

export default TodoCard;
