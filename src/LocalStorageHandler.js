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
    console.log(todo);
    const todos = this.getAllTodos();
    console.log(todos);
    this.saveToStorage([...todos, todo]);
  }

  getAllTodos() {
    return this.loadFromStorage() ?? [];
  }

  getOneTodo(id) {
    const todos = this.getAllTodos();
    return todos.find(todo => todo.id === id);
  }

  updateTodo(id, newTodo) {
    const oldTodo = this.getOneTodo(id);
    if (!oldTodo) throw new Error("Todo not found!");
    const oldTodos = this.getAllTodos();
    const newTodos = oldTodos.map(todo => todo.id === id
      ? { ...todo, ...newTodo }
      : todo);
    this.saveToStorage(newTodos);
  }

  deleteTodo(id) {
    const todos = this.getAllTodos();
    const newTodos = todos.filter(todo => todo.id !== id);
    this.saveToStorage(newTodos);
  }
}

export default LocalStorageHandler;
