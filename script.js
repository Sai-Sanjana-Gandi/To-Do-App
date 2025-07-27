let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskCounter() {
  const totalTasks = taskList.length;
  const completedTasks = taskList.filter(task => task.completed).length;
  
  document.getElementById("totalTasks").textContent = totalTasks;
  document.getElementById("completedTasks").textContent = completedTasks;
  
  // Show/hide empty state
  const emptyState = document.getElementById("emptyState");
  const taskListElement = document.getElementById("taskList");
  
  if (totalTasks === 0) {
    emptyState.style.display = "block";
    taskListElement.style.display = "none";
  } else {
    emptyState.style.display = "none";
    taskListElement.style.display = "block";
  }
}

function displayTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    
    // Add animation delay based on index
    li.style.animationDelay = `${index * 0.1}s`;
    
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <span class="task-actions">
        <button onclick="toggleComplete(${index})" class="complete-btn" title="Mark as complete">
          ${task.completed ? '✅' : '⭕'}
        </button>
        <button onclick="deleteTask(${index})" class="delete-btn" title="Delete task">
          🗑️
        </button>
      </span>
    `;
    ul.appendChild(li);
  });
  
  updateTaskCounter();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  
  if (task !== "") {
    // Add loading state to button
    const addButton = document.getElementById("addButton");
    const buttonText = addButton.querySelector('.button-text');
    const originalText = buttonText.textContent;
    
    buttonText.textContent = "Adding...";
    addButton.disabled = true;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      taskList.push({ text: task, completed: false });
      saveAndDisplay();
      input.value = "";
      input.focus();
      
      // Reset button
      buttonText.textContent = originalText;
      addButton.disabled = false;
    }, 300);
  } else {
    // Shake animation for empty input
    input.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      input.style.animation = "";
    }, 500);
  }
}

function deleteTask(index) {
  const li = event.target.closest('li');
  li.style.animation = "slideOut 0.3s ease forwards";
  
  setTimeout(() => {
    taskList.splice(index, 1);
    saveAndDisplay();
  }, 300);
}

function toggleComplete(index) {
  const li = event.target.closest('li');
  const button = event.target;
  
  // Add a small bounce animation
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "";
  }, 200);
  
  taskList[index].completed = !taskList[index].completed;
  saveAndDisplay();
}

function saveAndDisplay() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && document.activeElement.id === 'taskInput') {
    addTask();
  }
  
  if (event.key === 'Escape') {
    document.getElementById('taskInput').blur();
  }
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  displayTasks();
  
  // Focus on input when page loads
  document.getElementById('taskInput').focus();
  
  // Add hover effect to container
  const container = document.querySelector('.container');
  container.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  container.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});
