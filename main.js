import './style.css'
import TodoApp from "./src/TodoApp";
import UIHandler from "./src/UIHandler.js";

const app = new TodoApp({
  uiHandler: (app) => new UIHandler(app),
});
