
const clearCompleted = document.getElementById("clearCompleted");
const progressBar = document.getElementById("progressBar");
const input = document.getElementById("taskInput");
const dateInput = document.getElementById("taskDate");
const priorityInput = document.getElementById("taskPriority");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const taskCount = document.getElementById("taskCount");
const darkModeBtn = document.getElementById("darkMode");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(filteredTasks = tasks) {
  list.innerHTML = "";

  taskCount.textContent = "Total tasks: " + tasks.length;

  const completed = tasks.filter(function(task) {
    return task.completed;
  }).length;

  const percent = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;

  if (progressBar) {
    progressBar.style.width = percent + "%";
  }

  filteredTasks.forEach(function(task, index) {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent =
      task.text +
      " 📅 " +
      (task.date || "No date") +
      " ⭐ " +
      task.priority;

    span.addEventListener("click", function() {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function() {
      const newText = prompt("Edit your task:", task.text);

      if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        saveTasks();
        displayTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}
button.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText !== "") {
    tasks.push({
      text: taskText,
      date: dateInput.value,
      priority: priorityInput.value,
      completed: false
    });

    saveTasks();

    input.value = "";
    dateInput.value = "";
    priorityInput.value = "Low";

    displayTasks();
  }
});

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filtered = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchText);
  });

  displayTasks(filtered);
});

clearCompleted.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  displayTasks();
});

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
}

displayTasks();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
                          }
