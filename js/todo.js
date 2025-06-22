const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  list.innerHTML = "";
  tasks
    .filter(task =>
      filter === "all" ? true : filter === "completed" ? task.done : !task.done
    )
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.done ? "completed" : "";
      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">X</button>
      `;
      list.appendChild(li);
    });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();