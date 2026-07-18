let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML =
        `${task.text} (${task.category})
        <button class="delete" onclick="removeTask(${index})">X</button>`;

        li.onclick = function() {
            task.completed = !task.completed;
            save();
            displayTasks();
        };

        if(task.completed){
            li.classList.add("completed");
        }

        list.appendChild(li);
    });

    document.getElementById("count").innerHTML =
    "Tasks: " + tasks.length;
}

function addTask() {
    let text = document.getElementById("task").value;
    let category = document.getElementById("category").value;

    if(text === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: text,
        category: category,
        completed: false
    });

    save();
    displayTasks();

    document.getElementById("task").value = "";
}

function removeTask(index){
    tasks.splice(index,1);
    save();
    displayTasks();
}

displayTasks();
