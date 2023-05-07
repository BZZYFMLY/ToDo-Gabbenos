import {useState} from "react";

import Modal from "../Modal/Modal";

import {endpoints} from "../../api/endpoints";
import {backendURL} from "../../api/backendURL";
import {postMethod} from "../../api/methods";

const baseURL = backendURL.local;

const TodoCard = ({todo, setTodos}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(todo.content ?? "");

  const handleDelete = () => {
    const {id} = todo;
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
    setEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDone = () => {
    fetch(baseURL + endpoints.updateTodo, {
      ...postMethod,
      body: JSON.stringify({...todo, done: !todo.done}),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data ?? []);
      });
  };

  const handleEditContent = (e) => setEditContent(e.target.value);

  const handleSaveUpdate = () => {
    fetch(baseURL + endpoints.updateTodo, {
      ...postMethod,
      body: JSON.stringify({...todo, content: editContent}),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data ?? []);
      });
  };

  return (
    <>
      <li>
        <h2>{todo?.content}</h2>
        <p>{todo?.done ? "Completed" : "Not Completed"}</p>
        <p>{todo?.date}</p>
        <p>{todo?.id}</p>
        <button onClick={handleConfirmDelete}>Delete</button>
        <button onClick={handledit}>Edit</button>
        <button onClick={handleDone}>Done</button>
      </li>
      <Modal
        handleOk={handleSaveUpdate}
        open={editModalOpen}
        setOpen={setEditModalOpen}
        title="Edit todo"
        okButtonText="Save"
      >
        <label htmlFor="editContent">Todo content</label>
        <input
          type="text"
          name="editContent"
          placeholder="Add the new content"
          value={editContent}
          onInput={handleEditContent}
        />
      </Modal>
      <Modal
        handleOk={handleDelete}
        okButtonText="Delete"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Do you want to delete this todo?"
      />
    </>
  );
};

export default TodoCard;
