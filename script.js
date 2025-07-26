let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </span>
    `;
    ul.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task !== "") {
    taskList.push({ text: task, completed: false });
    saveAndDisplay();
    input.value = "";
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveAndDisplay();
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveAndDisplay();
}

function saveAndDisplay() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();
}

displayTasks(); // Load on startup
