class AbstractStorageHandler {
  constructor(app) {
    this.app = app;
  }

  saveToStorage(newTodos) {
    throw new Error("SaveToStorage not implemented!");
  }

  loadFromStorage() {
    throw new Error("LoadFromStorage not implemented!");
  }

  // CRUD - Creat, Read, Update, Delete
  createTodo(todo) {
    throw new Error("CreateTodo not implemented!");
  }

  getAllTodos() {
    throw new Error("GetAllTodos not implemented!");
  }

  getOneTodo(id) {
    throw new Error("GetOneTodo not implemented!");
  }

  updateTodo(id, newTodo) {
    throw new Error("UpdateTodo not implemented!");
  }

  deleteTodo(id) {
    throw new Error("DeleteTodo not implemented!");
  }
}

export default AbstractStorageHandler;
