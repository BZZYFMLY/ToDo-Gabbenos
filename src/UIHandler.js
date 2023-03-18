class UIHandler {
  #name = {};

  constructor(app) {
    this.app = app;

    this.ui = null;
    this.editedElementId = null;

    this.#name = {
      addButton: {id: "add-todo", tag: "button"},
      todoList: {id: "todos", tag: "ul"},
      todoInput: {id: "new-todo", tag: "input"},
      editInput: {id: "edit-todo", tag: "input"},
      saveTodo: {id: "save-todo", tag: "button"},
      editModal: {id: "edit-modal", tag: "div"},
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
    this.elements.todoInput.addEventListener(
      "input",
      (e) => (this.todoText = e.target.value)
    );

    this.elements.saveTodo.addEventListener("click", (e) => {
      const todoId = this.editedElementId;
      this.app.updateTodo(this.elements.editInput.value, todoId);
      this.elements.editModal.parentElement.classList.add("hidden");
      this.elements.editModal.classList.add("hidden");
    });

    this.elements.addButton.addEventListener("click", () => {
      this.app.createNewTodo(this.todoText);
    });
  }

  initInputField() {
    this.todoText = "";
    this.elements.todoInput.value = "";
  }

  clearTodoList() {
    this.elements.todoList.innerHTML = "";
  }

  renderTodoList() {
    this.initInputField();
    this.clearTodoList();
    this.app.storage.getAllTodos().forEach((todoElem) => {
      this.renderTodos(todoElem);
    });
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

  createButton(text, eventHandler, parent) {
    const button = this.createElement("button", {
      textContent: text,
      event: eventHandler,
    });
    parent.appendChild(button);
  }

  createCompleteButton(parent) {
    const cb = (e) => {
      const todoId = parent.parentElement.id;
      this.app.setDoneTodo(todoId);
    };

    this.createButton("Complete", {type: "click", cb}, parent);
  }

  createEditButton(parent, todoElem) {
    const cb = () => {
      this.elements.editModal.parentElement.classList.remove("hidden");
      this.elements.editModal.classList.remove("hidden");
      this.editedElementId = todoElem.id;
    };

    this.createButton("Edit", {type: "click", cb}, parent);
  }

  createDeleteButton(parent, todoElem) {
    const cb = (e) => {
      const todoId = todoElem.id;
      this.app.removeTodo(todoId);
    };

    this.createButton("Delete", {type: "click", cb}, parent);
  }

  renderTodos = ({id, content, time, active}) => {
    const todoElem = this.createElement("li", {
      className: "todo-item",
      parent: this.elements.todoList,
      id: id,
    });
    const todoItem = this.createElement("p", {
      parent: todoElem,
      className: active ? "" : "done",
      textContent: content,
    });
    const todoTime = this.createElement("span", {
      className: "todo-time",
      parent: todoElem,
      textContent: time,
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
