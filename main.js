import axios from "axios";

const baseurl = "https://localhost:3000/";

// Retrieve tasks from localStorage or set an empty array
const getTodos = () => {
  axios
    .post(baseurl + "gettodos", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "same-origin",
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("tasks", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

getTodos();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM elements
const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const sortSelect = document.querySelector("#sort");

// Add new task to the list
function addTask() {
  if (!taskInput.value) {
    return;
  }
  const task = {
    content: taskInput.value,
    date: new Date().toISOString(),
    done: false,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskInput.value = "";
}

// Mark task as done
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task from the list
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Edit task content
function editTask(index) {
  const newContent = prompt("Enter new task content:", tasks[index].content);
  if (!newContent) {
    return;
  }
  tasks[index].content = newContent;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render tasks to the list
function renderTasks() {
  // Sort tasks by date
  const sortOrder = sortSelect.value === "asc" ? 1 : -1;
  const sortedTasks = tasks.sort(
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
    deleteBtn.addEventListener("click", () => deleteTask(index));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTask(index));

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
addTaskBtn.addEventListener("click", addTask);
sortSelect.addEventListener("change", renderTasks);

// Render tasks on page load
renderTasks();
