const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

button.addEventListener("click", function() {
  const taskText = input.value;

  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Check off task when clicked
    li.addEventListener("click", function() {
      li.classList.toggle("completed");
    });

    list.appendChild(li);
    input.value = "";
  }
});
