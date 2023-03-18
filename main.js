import './style.css'
import TodoApp from "./src/TodoApp";
import UIHandler from "./src/UIHandler.js";
import LocalStorageHandler from "./src/LocalStorageHandler";

const app = new TodoApp({
  UIHandler: UIHandler,
  StorageHandler: LocalStorageHandler,
});
