document.addEventListener("DOMContentLoaded", () => {
  const addRowBtn = document.getElementById("addRowBtn");
  const habitTableBody = document.getElementById("habitTableBody");

  function updateProgress(row) {
    const checkboxes = row.querySelectorAll(".day-checkbox");
    const progressFill = row.querySelector(".progress-fill");
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => { if (cb.checked) checked++; });
    const percent = (checked / total) * 100;
    progressFill.style.width = percent + "%";
  }

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  function attachTaskInputListener(taskInput) {
    taskInput.addEventListener("input", function () {
      autoResize.call(this);
      saveData();
    });
  }

  function createRow(taskText = "", checkedArray = []) {
    const row = document.createElement("tr");

    // Delete icon
    const deleteCell = document.createElement("td");
const deleteBtn = document.createElement("button");
deleteBtn.className = "delete-btn";

// Create image inside button
const deleteImg = document.createElement("img");
deleteImg.src = "objects/icons/x-mark.png"; // ✅ correct path
deleteImg.alt = "Delete";
deleteImg.width = 20; // or 16, or your desired size
deleteImg.height = 20;

deleteBtn.appendChild(deleteImg);

// Add click event to remove row
deleteBtn.addEventListener("click", () => {
  row.remove();
  saveData();
});

deleteCell.appendChild(deleteBtn);
row.appendChild(deleteCell);


    // Task textarea
    const taskCell = document.createElement("td");
    const taskInput = document.createElement("textarea");
    taskInput.className = "taskName";
    taskInput.value = taskText;
    autoResize.call(taskInput);
    attachTaskInputListener(taskInput);
    taskCell.appendChild(taskInput);
    row.appendChild(taskCell);

    // Day checkboxes
    for (let i = 0; i < 7; i++) {
      const dayCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "day-checkbox";
      checkbox.checked = checkedArray[i] || false;
      checkbox.addEventListener("change", () => {
        updateProgress(row);
        saveData();
      });
      dayCell.appendChild(checkbox);
      row.appendChild(dayCell);
    }

    // Progress bar
    const progressCell = document.createElement("td");
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressBar.appendChild(progressFill);
    progressCell.appendChild(progressBar);
    row.appendChild(progressCell);

    habitTableBody.appendChild(row);
    updateProgress(row);
  }

  function saveData() {
    const data = [];
    const rows = habitTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const taskText = row.querySelector(".taskName")?.value || "";
      const checkboxes = row.querySelectorAll(".day-checkbox");
      const checkedArray = Array.from(checkboxes).map(cb => cb.checked);
      data.push({ taskText, checkedArray });
    });
    localStorage.setItem("habitTrackerData", JSON.stringify(data));
  }

  function loadData() {
    const data = JSON.parse(localStorage.getItem("habitTrackerData")) || [];
    habitTableBody.innerHTML = "";
    data.forEach(({ taskText, checkedArray }) => {
      createRow(taskText, checkedArray);
    });
  }

  addRowBtn.addEventListener("click", () => {
    createRow();
    saveData();
  });

  loadData();
});
