import AbstractStorageHandler from "./StorageHandler.Abstract.js";
// import FirebaseApp from "../FirebaseApp/FirebaseApp.js";
import {initializeApp} from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

class FirebaseStorageHandler extends AbstractStorageHandler {
  #todos;
  #db;
  #colName;
  #todoListener;

  constructor(app) {
    super(app);
    this.#todos = [];
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

    this.#db = getFirestore();

    this.#colName = "todos";

    this.query = query(
      collection(this.#db, this.#colName),
      orderBy("time", "desc")
    );

    this.subscribeToTodos();
  }

  async subscribeToTodos() {
    this.#todoListener = onSnapshot(this.query, (snaps) => {
      this.#todos = snaps.docs.map((doc) => {
        return doc.data();
      });
      this.app.ui.renderTodoList();
    });
  }

  unsubscribeFromTodos() {
    if (this.#todoListener != null) {
      this.#todoListener();
      this.#todoListener = null;
    }
  }

  async saveToStorage(todo) {
    await setDoc(doc(this.#db, this.#colName, todo.id), todo);
  }

  loadFromStorage() {
    return this.#todos;
  }

  // CRUD - Creat, Read, Update, Delete
  async createTodo(todo) {
    await this.saveToStorage(todo);
  }

  getAllTodos() {
    return this.loadFromStorage();
  }

  getOneFromDb(id) {
    const docRef = doc(this.#db, this.#colName, id);
    return docRef;
  }

  async getOneTodo(id) {
    const docRef = this.getOneFromDb(id);
    const docSnap = await getDoc(docRef);
    const todo = docSnap.data();
    if (docSnap.exists()) {
    } else {
    }
    return todo;
  }

  updateTodo(id, newTodo) {
    updateDoc(doc(this.#db, this.#colName, id), newTodo);
  }

  async deleteTodo(id) {
    await deleteDoc(doc(this.#db, this.#colName, id));
  }
}

export default FirebaseStorageHandler;
