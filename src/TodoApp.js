import {v4 as uuid} from "uuid";

class TodoApp {
  constructor({UIHandler}) {
    this.todoTasks = [];

    this.uiHandler = new UIHandler(this);
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

  addTodo(todo) {
    this.todoTasks.push(todo);
  }

  removeTodo(todoId) {
    console.log("todoId: ", todoId);
    console.log("this.todoTasks: ", this.todoTasks);
    this.todoTasks = this.todoTasks.filter((todo) => todo.id !== todoId);
    console.log("this.todoTasks: ", this.todoTasks);
  }

  getTodos() {
    return this.todoTasks;
  }
}

export default TodoApp;
