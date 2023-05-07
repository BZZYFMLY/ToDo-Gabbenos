import TodoCard from "../TodoCard/TodoCard";

import style from "./TodoList.module.css";

const TodoList = ({todos, setTodos}) => {
  return (
    <div className={style.todoList}>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
