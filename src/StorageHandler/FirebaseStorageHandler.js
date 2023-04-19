import AbstractStorageHandler from "./StorageHandler.Abstract.js";
import FirebaseApp from "../FirebaseApp/FirebaseApp.js";

class FirebaseStorageHandler extends AbstractStorageHandler {
  constructor(app) {
    super(app);

    this.firebaseApp = FirebaseApp.getInstance;
    this.db = this.firebaseApp.db;
  }

  saveToStorage(newTodos) {}

  loadFromStorage() {}

  // CRUD - Creat, Read, Update, Delete
  createTodo(todo) {}

  getAllTodos() {}

  getOneTodo(id) {}

  updateTodo(id, newTodo) {}

  deleteTodo(id) {}
}

export default FirebaseStorageHandler;
