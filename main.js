import axios from "axios";
import {v4 as uuid} from "uuid";

const todosStorageKey = "todos";
const getTodosEndpoint = "gettodos";
const addTodoEndpoint = "addtodo";
const clearAllTodosEndpoint = "clearalltodos";
const deleteTodoEndpoint = "deletetodo";
const updateTodoEndpoint = "updatetodo";

const localurl = "http://localhost:8080/";
const flyUrl = "https://todo-gabbenos-api.fly.dev/";

// const baseurl = ["localhost", "127.0.0.1"].includes(window.location.hostname)
//   ? localurl
//   : flyUrl;

const baseurl = flyUrl;


const postHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

const axoisOptions = {
  headers: postHeaders,
  withCredentials: true,
  credentials: "same-origin",
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}; // Save tasks to localStorage

const loadFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}; // Retrieve tasks from localStorage or set an empty array

const loadTodosFromStorage = () => {
  return loadFromStorage(todosStorageKey);
};

const saveTodosToStorage = (tasks) => {
  saveToStorage(todosStorageKey, tasks);
};

// Retrieve tasks from localStorage or set an empty array
const getTodos = async () => {
  let data = [];
  await axios
    .post(baseurl + getTodosEndpoint, axoisOptions)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data || [];
};

let todos = await getTodos();

const saveTodo = async (todo) => {
  let newTodos = [];

  await axios
    .post(baseurl + addTodoEndpoint, {
      ...axoisOptions,
      data: todo,
    })
    .then((res) => {
      newTodos = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return newTodos;
};

const updateTodo = async (todo) => {
  let newTodos = [];

  await axios
    .post(baseurl + updateTodoEndpoint, {
      ...axoisOptions,
      data: todo,
    })
    .then((res) => {
      newTodos = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return newTodos;
};

const removeTodo = async (todo) => {
  let newTodos;
  await axios
    .post(baseurl + deleteTodoEndpoint, {
      ...axoisOptions,
      data: todo,
    })
    .then((res) => {
      newTodos = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return newTodos;
};

// Add new task to the list
async function addTodo() {
  if (!todoInput.value) {
    return;
  }

  const todo = {
    id: uuid(),
    content: todoInput.value,
    date: new Date().toISOString(),
    done: false,
  };

  todos = await saveTodo(todo);
  renderTodos();
  todoInput.value = "";
}

// Mark task as done
async function toggleDone(todo) {
  todos = await updateTodo({
    ...todo,
    done: !todo.done,
  });
  renderTodos();
}

// Delete task from the list
async function deleteTodo(todo) {
  todos = await removeTodo(todo);
  renderTodos();
}

// Edit task content
async function editTodo(todo) {
  const newContent = prompt("Enter new task content:", todo.content);

  if (!newContent || newContent === todo.content || !newContent === "") {
    return;
  }
  const modifiedTodo = {...todo, content: newContent};

  todos = await updateTodo(modifiedTodo);
  renderTodos();
}

// DOM elements
const todoInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const sortSelect = document.querySelector("#sort");

// Render tasks to the list
function renderTodos() {
  // Sort tasks by date
  const sortOrder = sortSelect.value === "asc" ? 1 : -1;
  const sortedTasks = todos.sort(
    (a, b) => sortOrder * (new Date(a.date) - new Date(b.date))
  );

  // Clear task list
  taskList.innerHTML = "";

  // Render tasks to the list
  sortedTasks.forEach((todo) => {
    const taskEl = document.createElement("li");
    taskEl.id = todo?.id;

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", () => toggleDone(todo));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", async () => await deleteTodo(todo));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTodo(todo));

    const contentSpan = document.createElement("span");
    contentSpan.innerText = todo.content;
    contentSpan.classList.add("content");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    dateSpan.innerText = new Date(todo.date).toLocaleDateString();

    if (todo.done) {
      taskEl.classList.add("done");
    }

    taskEl.appendChild(doneBtn);
    taskEl.appendChild(contentSpan);
    taskEl.appendChild(dateSpan);
    taskEl.appendChild(editBtn);
    taskEl.appendChild(deleteBtn);

    taskList.appendChild(taskEl);
  });
}

// Add task event listener
addTaskBtn.addEventListener("click", addTodo);
sortSelect.addEventListener("change", renderTodos);

// Render tasks on page load
renderTodos();
