import {v4 as uuid} from "uuid";

class UIHandler {
  #name = {};

  constructor(app) {
    this.app = app;

    this.ui = null;
    this.#name = {
      addButton: {id: "add-todo", tag: "button"},
      todoList: {id: "todos", tag: "ul"},
      todoInput: {id: "new-todo", tag: "input"},
    };

    this.elements = Object.entries(this.#name).reduce((acc, [key, value]) => {
      let elem = document.getElementById(value.id);

      if (!elem) {
        elem = document.createElement(value.tag);
        elem.id = value.id;
      }

      acc[key] = elem;

      return acc;
    }, {});

    this.elements.todoList.innerHTML = "";
    this.todoText = "";

    console.log(this.elements.todoInput);
    this.elements.todoInput.addEventListener(
      "input",
      (e) => (this.todoText = e.target.value)
    );

    this.elements.addButton.addEventListener("click", () => this.createTodo());
  }

  createElement(
    tag,
    {id, insterBefore, className, textContent, parent, data, event}
  ) {
    const elem = document.createElement(tag);
    if (id) elem.id = id;
    if (className) elem.classList.add(className);
    if (textContent) elem.textContent = textContent;
    if (data?.key && data?.value) elem.dataset[key] = value;
    if (insterBefore && parent) parent.insertBefore(elem, insterBefore);
    else if (parent) parent.appendChild(elem);
    if (event?.type && event?.cb) elem.addEventListener(event.type, event.cb);
    return elem;
  }

  createButton(text, cb, parent) {
    const button = this.createElement("button", {
      textContent: text,
      event: {type: "click", cb},
    });
    parent.appendChild(button);
  }

  createCompleteButton(parent, todoItem) {
    const cb = (e) => {
      const todoText = todoItem.querySelector("p");
      let isCompleted;

      const todoId = todoElem.id;

      this.app.todoTasks = this.app.todoTasks.map((todo) => {
        if (todo.id === todoId) {
          isCompleted = !todo.active;
          return {...todo, active: isCompleted};
        }
        return todo;
      });
      isCompleted && todoText.classList.add("done");
      // TODO: implement the useage of storageHandler save method
    };

    this.createButton("Complete", {type: "click", cb}, parent);
  }

  createEditButton(parent, todoElem) {
    const cb = (e) => {
      const button = e.target;
      const todoText = todoElem.querySelector("p");

      button.style.display = "none";
      todoText.style.display = "none";

      const input = this.createElement("input", {
        value: todoText.textContent,
        parent: todoElem,
        insterBefore: todoText,
      });

      input.addEventListener("onchang", (e) => {
        todoText.textContent = e.target.value;
      });

      const originalTodo = this.app.todoTasks.find(
        (todo) => todo.id === todoElem.id
      );
      const newTodo = {...originalTodo, todo: input.value};

      const save = (e) => {
        // newTodo
        // TODO implement the update method
      };

      this.createButton("Save", {type: "click", save}, button.parentElement);
    };

    this.createButton("Edit", {type: "click", cb}, parent);
  }

  createDeleteButton(parent, todoElem) {
    const cb = (e) => {
      const todoId = todoElem.id;

      this.app.todoTasks = this.app.todoTasks.filter(
        (todo) => todo.id !== todoId
      );
      // TODO: implement storageHandler todoElem.remove();
    };

    this.createButton("Delete", {type: "click", cb}, parent);
  }

  createTodo = (id) => {
    const time = new Date();
    const timeString = new Intl.DateTimeFormat("hu-HU", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(time);
    const todoElem = this.createElement("li", {
      className: "todo-item",
      parent: this.elements.todoList,
      id: id ?? uuid(),
    });
    const todoItem = this.createElement("p", {
      parent: todoElem,
      textContent: this.todoText,
    });
    const todoTime = this.createElement("span", {
      className: "todo-time",
      parent: todoElem,
      textContent: timeString,
    });
    const todoButtonWrapper = this.createElement("div", {
      className: "todo-button-wrapper",
      parent: todoElem,
    });
    this.createCompleteButton(todoButtonWrapper, todoElem);
    this.createEditButton(todoButtonWrapper, todoElem);
    this.createDeleteButton(todoButtonWrapper, todoElem);
  };
}

export default UIHandler;
