import AbstractStorageHandler from "./StorageHandler.Abstract.js";
// import FirebaseApp from "../FirebaseApp/FirebaseApp.js";
import {initializeApp} from "firebase/app";

import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  where,
} from "firebase/firestore";

class FirebaseStorageHandler extends AbstractStorageHandler {
  #todos;
  #dbName;

  constructor(app) {
    super(app);
    this.#todos = [];

    this.#dbName = "todos";

    this.firebaseConfig = {
      apiKey: "AIzaSyApxout8xT1PmAHAWk7Q-MAvnumqPjIUUk",
      authDomain: "gabbenos-todo.firebaseapp.com",
      databaseURL:
        "https://gabbenos-todo-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "gabbenos-todo",
      storageBucket: "gabbenos-todo.appspot.com",
      messagingSenderId: "522421742349",
      appId: "1:522421742349:web:aa142e679b9f1e457a5e44",
    };

    initializeApp(this.firebaseConfig);

    // this.firebaseApp = FirebaseApp.getInstance;

    this.db = getFirestore();
    this.subscribeToTodos();
  }

  subscribeToTodos() {
    const q = query(collection(this.db, this.#dbName), orderBy("timestamp", "desc"));
    this.todoListener = onSnapshot(q, (snaps) => {
      this.todos = snaps.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(this.todos)
    });
  }

  unsubscribeFromTodos() {
    if (this.todoListener != null) {
      this.todoListener();
      this.todoListener = null;
    }
  }

  saveToStorage(newTodos) {
    addDoc(collection(db, this.#dbName), newTodos);
  }

  loadFromStorage() {}

  // CRUD - Creat, Read, Update, Delete
  createTodo(todo) {
    addDoc(collection(this.db, this.#dbName), todo);
  }

  getAllTodos() {
    return this.#todos;
  }

  getOneTodo(id) {}

  updateTodo(id, newTodo) {}

  deleteTodo(id) {}
}

export default FirebaseStorageHandler;
