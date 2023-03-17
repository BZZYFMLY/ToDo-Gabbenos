class TodoApp {
  constructor({uiHandler}) {
    this.todoTasks = [];

    this.uiHandler = uiHandler(this);
  }

  add(todo) {
    this.todoTasks.push(todo);
  }

  remove(todo) {
    this.todoTasks = this.todoTasks.filter((t) => t !== todo);
  }

  getTodos() {
    return this.todoTasks;
  }
}

export default TodoApp;
