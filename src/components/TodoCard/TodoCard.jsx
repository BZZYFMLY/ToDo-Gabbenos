import {useState, useContext} from "react";

import Modal from "../Modal/Modal";

import {TodoContext} from "../../App";

import {apiEndpoints} from "../../api/apiEndpoints";
import {postMethod} from "../../api/apiMethods";

import styles from "./TodoCard.module.css";

const TodoCard = ({todo}) => {
  const {setTodos, baseURL} = useContext(TodoContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleDelete = () => {
    console.log("delete", JSON.stringify(todo.id));
    fetch(baseURL + apiEndpoints.deleteTodo, {
      ...postMethod,
      body: JSON.stringify({id: todo.id}),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const handledit = () => {
    setModalOpen(true);
    console.log("edit");
  };

  const handleDone = () => {
    const newTodo = {...todo, done: !todo.done};

    fetch(baseURL + apiEndpoints.updateTodo, {
      ...postMethod,
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const handleEditContent = (e) => setEditContent(e.target.value);

  const handleSave = () => {
    const newTodo = {...todo, content: editContent};
    fetch(baseURL + apiEndpoints.updateTodo, {
      ...postMethod,
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const urgent =
    new Date().getTime() - new Date(todo?.date).getTime() >
    5 * 24 * 60 * 60 * 1000;

  return (
    <>
      <li className={styles.todoCard}>
        <h2 className={styles.cardTitle}>{todo?.content}</h2>
        <p className={!todo?.done ? styles.activeTodo : styles.passiveTodo}>
          {todo?.done ? "Completed" : "Not Completed"}
        </p>
        <p className={urgent ? styles.urgentTodo : null}>{todo?.date}</p>
        <p>{todo?.id}</p>
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.btn} onClick={handledit}>
            Edit
          </button>
          <button className={styles.btn} onClick={handleDone}>
            Done
          </button>
        </div>
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
