document.addEventListener("DOMContentLoaded", loadTasks);

const taskForm = document.getElementById("task-form");
const taskTableBody = document.getElementById("task-table-body");

// Add Task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const task = {
        name: document.getElementById("task-name").value,
        status: document.getElementById("status").value,
        headedIn: document.getElementById("headed-in").value,
        details: document.getElementById("task-details").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        notes: document.getElementById("notes").value
    };

    addTaskToTable(task);
    saveTask(task);
    taskForm.reset();
});

// Add Task to Table
function addTaskToTable(task) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.status}</td>
        <td>${task.headedIn}</td>
        <td>${task.details}</td>
        <td>${task.date}</td>
        <td>${task.time}</td>
        <td>${task.notes}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function() {
        row.remove();
        deleteTask(task.name);
    });

    row.querySelector(".edit-btn").addEventListener("click", function() {
        editTask(row, task);
    });

    taskTableBody.appendChild(row);
}

// Save Task in Local Storage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToTable);
}

// Delete Task from Local Storage
function deleteTask(taskName) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit Task
function editTask(row, task) {
    document.getElementById("task-name").value = task.name;
    document.getElementById("status").value = task.status;
    document.getElementById("headed-in").value = task.headedIn;
    document.getElementById("task-details").value = task.details;
    document.getElementById("date").value = task.date;
    document.getElementById("time").value = task.time;
    document.getElementById("notes").value = task.notes;
    row.remove();
    deleteTask(task.name);
}
