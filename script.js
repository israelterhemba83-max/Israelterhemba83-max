
const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  list.innerHTML = "";

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", function() {
  const taskText = input.value;

  if (taskText !== "") {
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    displayTasks();
  }
});

displayTasks();
