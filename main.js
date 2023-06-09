import './style.css'
import { v4 as uuid } from 'uuid';

let todoTasks = [];
let fieldValue = "";

const addButton = document.getElementById("add-todo");

const todoList = document.getElementById("todos");
todoList.innerHTML = "";

const createButton = ({text, cb}) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", cb);
  return button;
}

const createTodo = ({todo, id, active}) => {
  const todoWrapper = document.createElement("li");
  todoWrapper.id = id;

  todoWrapper.classList.add("todo-item");

  const todoItem = document.createElement("p");
  !active && todoItem.classList.add("done");

  const buttonWrapper = document.createElement("div");

  const todoComplete = createButton({text: "Complete", cb: (e) => {
    const todoText = e.target.parentNode.parentNode.querySelector("p");
    todoText.classList.toggle("done");
    const todoId = e.target.parentNode.parentNode.id;
    todoTasks = todoTasks.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, active: !todo.active };
      }
      return todo;
    });
    todoText.classList.toggle("completed");
    addToStorage();
  }});

  const todoEdit = createButton({
    text: "Edit",
    cb: (e) => {
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
              return { ...todoElem, todo: input.value };
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
    },
  });

  const todoDelete = createButton({
    text: "Delete",
    cb: (e) => {
      const todoId = e.target.parentNode.parentNode.id;
      todoTasks = todoTasks.filter((todo) => todo.id !== todoId);
      document.getElementById(todoId).remove();
    },
  });

  todoItem.textContent = todo;

  todoWrapper.appendChild(todoItem);
  buttonWrapper.appendChild(todoDelete);
  buttonWrapper.appendChild(todoEdit);
  buttonWrapper.appendChild(todoComplete);
  todoWrapper.appendChild(buttonWrapper);
  todoList.appendChild(todoWrapper);
};

const getFromStorage = () => {
  todoTasks = JSON.parse(localStorage.getItem("todoTasks")) ?? [];
  if (todoTasks) {
    todoTasks.forEach((todo) => {
      createTodo(todo);
    });
  }
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
}


