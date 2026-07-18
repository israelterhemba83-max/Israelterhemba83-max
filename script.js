let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="completeTask(${index})">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        list.appendChild(li);
    });

    document.getElementById("count").innerText =
        "Tasks: " + tasks.length;
}

function addTask() {
    let input = document.getElementById("task");
    let text = input.value;

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    showTasks();

    input.value = "";
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
}

showTasks();
