import { v4 as uuid } from "uuid";

class TodoApp {
  constructor({ UIHandler, StorageHandler }) {
    this.storage = new StorageHandler(this);
    this.ui = new UIHandler(this);
  }

  addTodo(newTodo) {
    this.storage.createTodo(newTodo);
    this.ui.renderTodoList();
  }

  createNewTodo = (content) => {
    const time = new Date();
    const id = uuid();
    const timeString = new Intl.DateTimeFormat("hu-HU", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(time);
    const newTodo = {
      id,
      content,
      time: timeString,
      active: true,
    };
    this.addTodo(newTodo);
  };

  setDoneTodo(todoId) {
    const oldTodo = this.storage.getOneTodo(todoId);
    this.storage.updateTodo(todoId, { ...oldTodo, active: !oldTodo.active });
    this.ui.renderTodoList();
  }

  removeTodo = (todoId) => {
    this.storage.deleteTodo(todoId);
    this.ui.renderTodoList();
  };

  updateTodo = (todoId, newContent) => {
    this.storage.updateTodo(todoId, { content: newContent });
    this.ui.renderTodoList();
  };
}

export default TodoApp;
