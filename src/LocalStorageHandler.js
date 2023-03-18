class LocalStorageHandler {
  constructor(app) {
    this.app = app;
    this.storage = window.localStorage;
  }

  saveToStorage(newTodos) {
    this.storage.setItem("todos", JSON.stringify(newTodos));
  }

  loadFromStorage() {
    const todos = this.storage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  // CRUD - Creat, Read, Update, Delete
  createTodo(todo) {
    const todos = this.getAllTodos();
    this.saveToStorage([...todos, todo]);
  }

  getAllTodos() {
    return this.loadFromStorage();
  }

  getOneTodo(id) {}

  updateTodo(id, todo) {}

  deleteTodo(id) {}
}

export default LocalStorageHandler;
