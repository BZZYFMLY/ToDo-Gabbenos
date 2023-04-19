import './style.css'
import TodoApp from "./src/App/TodoApp";
import UIHandler from "./src/UI/UIHandler.js";
import LocalStorageHandler from "./src/StorageHandler/LocalStorageHandler";

const app = new TodoApp({
  UIHandler: UIHandler,
  StorageHandler: LocalStorageHandler,
});
