class UIHandlerAbstract {
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
      editModal: {id: "edit-modal", tag: "div"},
      saveTodo: {id: "save-todo", tag: "button"},
      cancelEdit: {id: "cancel-edit-todo", tag: "button"},
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

    this.todoText = "";

    this.handleInputField();
    this.handleEditButton();
    this.handleCancelButton();
    this.handleAddButton();

    this.renderTodoList();
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
    const todos = this.app.storage.getAllTodos();
    console.log(todos);
    todos.forEach((todoElem) => {
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

  handleInputField() {
    this.elements.todoInput.addEventListener(
      "input",
      (e) => (this.todoText = e.target.value)
    );
  }

  createButton(textContent, event, parent, className = "") {
    const button = this.createElement("button", {
      textContent,
      event,
      className,
    });
    parent.appendChild(button);
  }

  createCompleteButton(parent) {
    const cb = (e) => {
      const todoId = parent.parentElement.id;
      this.app.setDoneTodo(todoId);
    };

    this.createButton("Complete", {type: "click", cb}, parent, "complete-btn");
  }

  createEditButton(parent, todoElem) {
    const cb = () => {
      this.elements.editModal.parentElement.classList.remove("hidden");
      this.editedElementId = todoElem.id;
      const todoCard = this.elements.todoList.querySelector("#" + todoElem.id);
      const todoContent = todoCard.querySelector("p").textContent;
      this.elements.editInput.value = todoContent ?? "";
    };

    this.createButton("Edit", {type: "click", cb}, parent, "edit-btn");
  }

  createDeleteButton(parent, todoElem) {
    const cb = (e) => {
      const todoId = todoElem.id;
      this.app.removeTodo(todoId);
    };

    this.createButton("Delete", {type: "click", cb}, parent, "delete-btn");
  }

  handleAddButton() {
    this.elements.addButton.addEventListener("click", () => {
      this.app.createNewTodo(this.todoText);
    });
  }

  handleEditButton() {
    this.elements.saveTodo.addEventListener("click", (e) => {
      const todoId = this.editedElementId;
      this.app.updateTodo(todoId, this.elements.editInput.value);
      this.elements.editModal.parentElement.classList.add("hidden");
    });
  }

  handleCancelButton() {
    this.elements.cancelEdit.addEventListener("click", () => {
      this.elements.editModal.parentElement.classList.add("hidden");
      this.elements.editInput.value = "";
    });
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

export default UIHandlerAbstract;
