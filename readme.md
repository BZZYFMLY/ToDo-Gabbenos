# Todo App with Firebase Firestore Realtime DB
This is a simple Todo app built using Object-Oriented Programming (OOP) and Firebase Firestore Realtime Database. The app allows you to create, read, update and delete tasks, and it offers two different storage options: local storage and Firebase Firestore.

## Features
Create, read, update, and delete tasks.
Two different storage options: local storage and Firebase Firestore.
Fully written in OOP.
Abstract class for UI and Local/Firestore Storage handlers to guarantee the same interface for the classes.
Uses dependency injection to instantiate UIHandler and StorageHandler subclasses.
## Usage
You can try the app by accessing https://todo-gabbenos-firebase.netlify.app/. To use Firebase Firestore as a storage option, you will need to provide your own Firebase configuration by adding the firebase config into FirebaseStorageHandler.js file.

javascript
Using of ToDoApp.js in main.js:
```javascript
import ToDoApp from './ToDoApp.js';
import UIHandler from './UIHandler.js';
import LocalStorageHandler from './LocalStorageHandler.js';
// or import FirestoreStorageHandler from './FirestoreStorageHandler.js';

const app = new ToDoApp({
  UIHandler: new UIHandler(),
  StorageHandler: new LocalStorageHandler(), // or new FirestoreStorageHandler()
});
```


Contribution
Contributions to this project are always welcome. Feel free to submit any issues or pull requests.