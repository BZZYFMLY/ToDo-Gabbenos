import {useState} from "react";

import Modal from "../Modal/Modal";

const TodoCard = ({todo, setTodos}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleDelete = () => {
    setTodos((prev) =>
      prev.filter((todoFromList) => todoFromList.id !== todo.id),
    );
  };

  const handledit = () => {
    setModalOpen(true);
    console.log("edit");
  };

  const handleDone = () => {
    setTodos((prev) => {
      return prev.map((todoFromList) => {
        return todoFromList.id === todo.id
          ? {...todoFromList, done: !todoFromList?.done}
          : todoFromList;
      });
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
