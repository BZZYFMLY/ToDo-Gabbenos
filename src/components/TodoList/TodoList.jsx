import {useContext} from "react";
import TodoCard from "../TodoCard/TodoCard";

import {TodoContext} from "../../App";

import styles from "./TodoList.module.css";

const TodoList = () => {
  const {todos} = useContext(TodoContext);

  return (
    <div className="Todo-list">
      <h2 className={styles.listTitle}> Todos </h2>
      <ul className={styles.todoList}>
        {todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
