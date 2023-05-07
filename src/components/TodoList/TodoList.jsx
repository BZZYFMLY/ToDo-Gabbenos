import TodoCard from "../TodoCard/TodoCard";

const TodoList = ({todos, setTodos}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
