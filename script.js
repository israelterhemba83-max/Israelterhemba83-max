const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

button.addEventListener("click", function() {
  const taskText = input.value;

  if (taskText !== "") {
const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = taskText;

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.addEventListener("click", function() {
  li.remove();
});

li.appendChild(span);
li.appendChild(deleteBtn);

    // Check off task when clicked
    li.addEventListener("click", function() {
      li.classList.toggle("completed");
    });

    list.appendChild(li);
    input.value = "";
  }
});
