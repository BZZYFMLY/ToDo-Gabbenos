import axios from "axios";
import postHeaders from "./src/constants/postHeaders";

const todosStorageKey = "todos";
const getTodosEndpoint = "gettodos";
const addTodoEndpoint = "addtodo";
const deleteTodoEndpoint = "deletetodo";
const updateTodoEndpoint = "updatetodo";

const baseurl = "http://localhost:3000/";

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
    .post(baseurl + getTodosEndpoint, {
      headers: postHeaders,
      withCredentials: true,
      credentials: "same-origin",
    })
    .then((res) => {
      data = res.data;
      saveTodosToStorage(data);
    })
    .catch((err) => {
      console.log(err);
    });
  return data || [];
};

const pushTodo = async (task) => {
  await axios
    .post(baseurl + addTodoEndpoint, {
      headers: postHeaders,
      withCredentials: true,
      credentials: "same-origin",
      data: task,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const todos = await getTodos();
console.log(todos);

// DOM elements
const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const sortSelect = document.querySelector("#sort");

// Add new task to the list
function addTodo() {
  if (!taskInput.value) {
    return;
  }
  const task = {
    content: taskInput.value,
    date: new Date().toISOString(),
    done: false,
  };
  todos.push(task);
  pushTodo(task);
  localStorage.setItem(todos, JSON.stringify(todos));
  renderTodos();
  taskInput.value = "";
}

// Mark task as done
function toggleDone(index) {
  todos[index].done = !todos[index].done;
  localStorage.setItem(todos, JSON.stringify(todos));
  renderTodos();
}

// Delete task from the list
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem(todos, JSON.stringify(todos));
  renderTodos();
}

// Edit task content
function editTodo(index) {
  const newContent = prompt("Enter new task content:", todos[index].content);
  if (!newContent) {
    return;
  }
  todos[index].content = newContent;
  localStorage.setItem(todos, JSON.stringify(todos));
  renderTodos();
}

// Render tasks to the list
function renderTodos() {
  // Sort tasks by date
  const sortOrder = sortSelect.value === "asc" ? 1 : -1;
  console.log(todos);
  const sortedTasks = todos.sort(
    (a, b) => sortOrder * (new Date(a.date) - new Date(b.date))
  );

  // Clear task list
  taskList.innerHTML = "";

  // Render tasks to the list
  sortedTasks.forEach((task, index) => {
    const taskEl = document.createElement("li");

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", () => toggleDone(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTodo(index));

    const contentSpan = document.createElement("span");
    contentSpan.innerText = task.content;
    contentSpan.classList.add("content");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    dateSpan.innerText = new Date(task.date).toLocaleDateString();

    if (task.done) {
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
