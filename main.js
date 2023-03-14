import {v4 as uuid} from "uuid";
import "./style.css";

let todoTasks = [];
let fieldValue = "";

const addButton = document.getElementById("add-todo");

const todoList = document.getElementById("todos");
todoList.innerHTML = "";

const createTodo = ({todo, id, active}) => {
  const todoElem = `
    <li id="${id}" class="todo-item">
      <p class="${active ? "active" : "done"}">${todo}</p>
      <div>
        <button class="deleteBtn">Delete</button>
        <button class="editBtn">Edit</button>
        <button class="completeBtn">Complete</button>
      </div>
    </li>`;

  todoList.innerHTML += todoElem;

  const todoItem = document.getElementById(`${id}`);
  const deleteBtn = todoItem.querySelector(".deleteBtn");
  const editBtn = todoItem.querySelector(".editBtn");
  const completeBtn = todoItem.querySelector(".completeBtn");

  const createButton = ({text, cb}) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", cb);
    return button;
  };

  deleteBtn.addEventListener("click", (e) => {
    todoTasks = todoTasks.filter((todo) => todo.id !== id);
    todoItem.remove();
  });

  completeBtn.addEventListener("click", (e) => {
    const todoText = e.target.parentNode.parentNode.querySelector("p");
    todoText.classList.toggle("done");
    const todoId = e.target.parentNode.parentNode.id;
    todoTasks = todoTasks.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, active: !todo.active};
      }
      return todo;
    });
    todoText.classList.toggle("completed");
    addToStorage();
  });

  editBtn.addEventListener("click", (e) => {
    const button = e.target;
    const buttonContainer = e.target.parentNode;
    const todoTextParent = e.target.parentNode.parentNode;
    const todoText = todoTextParent.querySelector("p");

    todoText.style.display = "none";

    const input = document.createElement("input");
    input.value = todoText.textContent;
    todoTextParent.insertBefore(input, buttonContainer);

    const saveButton = createButton({
      text: "Save",
      cb: (e) => {
        const todoText = e.target.parentNode.parentNode.querySelector("p");
        todoTasks = todoTasks.map((todoElem) => {
          if (todoElem.id === e.target.parentNode.parentNode.id) {
            return {...todoElem, todo: input.value};
          }
          return todoElem;
        });
        addToStorage();
        todoText.textContent = input.value;
        todoText.style.display = "inline-block";
        button.style.display = "inline-block";
        input.remove();
        saveButton.remove();
      },
    });

    buttonContainer.appendChild(saveButton);

    button.style.display = "none";
  });

  return todoElem;
};

const getFromStorage = () => {
  todoTasks = JSON.parse(localStorage.getItem("todoTasks")) ?? [];
  if (todoTasks) todoTasks.map((todo) => createTodo(todo));
};

getFromStorage();

const textField = document.getElementById("new-todo");

textField.addEventListener("change", (event) => {
  fieldValue = event.target.value;
});

addButton.addEventListener("click", () => {
  const id = uuid();

  if (fieldValue === "") return;

  const todoElem = {todo: fieldValue, id, active: true};

  //TODO check the existing todos and if the new todo is already there, don't add it
  createTodo(todoElem);
  todoTasks.push(todoElem);
  addToStorage();

  fieldValue = "";
  textField.value = fieldValue;
});

const addToStorage = () => {
  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
};
