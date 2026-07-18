
const input = document.getElementById("taskInput");
const dateInput = document.getElementById("taskDate");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  list.innerHTML = "";

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");

    if (task.date) {
      span.textContent = task.text + " 📅 " + task.date;
    } else {
      span.textContent = task.text;
    }

    if (task.completed) {
      li.classList.add("completed");
    }

    span.addEventListener("click", function() {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

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
  const taskDate = dateInput.value;

  if (taskText !== "") {
    tasks.push({
      text: taskText,
      date: taskDate,
      completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    dateInput.value = "";

    displayTasks();
  }
});

displayTasks();
