import {v4 as uuid} from "uuid";

class TodoApp {
  #todoTasks = [];

  constructor({UIHandler, StorageHandler}) {
    this.ui = new UIHandler(this);
    this.storage = new StorageHandler(this);
  }

  addTodo(newTodo) {
    this.storage.createTodo(newTodo);
    this.ui.renderTodoList();
  }

  setDoneTodo(todoId) {
    this.#todoTasks = this.#todoTasks.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          active: !todo.active,
        };
      }
    });
    this.ui.renderTodoList();
  }

  todoTasks() {
    return this.#todoTasks;
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

  removeTodo(todoId) {
    this.#todoTasks = this.#todoTasks.filter((todo) => todo.id !== todoId);
  }

  updateTodo(content, todoId) {
    this.#todoTasks = this.#todoTasks.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          content,
        };
      }
    });
  }

  getTodos() {
    return this.#todoTasks;
  }
}

export default TodoApp;
