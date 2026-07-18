function addTask() {
    let task = document.getElementById("task").value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.innerText = task;

    li.onclick = function() {
        li.style.textDecoration = "line-through";
    };

    document.getElementById("list").appendChild(li);

    document.getElementById("task").value = "";
}
