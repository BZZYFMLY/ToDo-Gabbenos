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

class FirebaseApp {
  // singletone pattern
  static instance = null;

  constructor(create = false) {
    if (this.instance || !create) {
      throw new Error(
        "This is a singletone class, you can only have instance! You have to use getInstance()"
      );
    }

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
    this.db = getFirestore();

    return this;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FirebaseApp(true);
    }
    return this.instance;
  }
}

export default FirebaseApp;
