document.addEventListener("DOMContentLoaded", () => {
    const addRowBtn = document.getElementById("addRowBtn");
    const taskTableBody = document.getElementById("taskTableBody");

    const courseOptions = new Set();
    const taskTypeOptions = new Set();
    courseOptions.add("CS101");
    taskTypeOptions.add("Assignment");

    addRowBtn.addEventListener("click", () => {
        const row = createRow();
        taskTableBody.appendChild(row);
        sortTable();
    });

    // Sort every 3 seconds
    setInterval(sortTable, 3000);

    function createRow() {
        const row = document.createElement("tr");

        const courseSelect = createSelect(Array.from(courseOptions), "Select course");
        const taskTypeSelect = createSelect(Array.from(taskTypeOptions), "Select task type");

        row.innerHTML = `
            <td><input type="text" class="name" placeholder="Task name"></td>
            <td>
                <select class="status">
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </td>
            <td class="course-select-cell"></td>
            <td><input type="checkbox" class="checked"></td>
            <td class="tasktype-select-cell"></td>
            <td><input type="datetime-local" class="deadline"></td>
            <td><textarea class="notes" rows="1" placeholder="Add notes..."></textarea></td>
            <td><button class="delete-row">🗑️</button></td>
        `;

        row.querySelector(".course-select-cell").appendChild(courseSelect);
        row.querySelector(".tasktype-select-cell").appendChild(taskTypeSelect);

        // Handle status styling
        const statusSelect = row.querySelector(".status");
        applyStatusClass(row); // Apply initially
        statusSelect.addEventListener("change", () => applyStatusClass(row));

        // Auto-resize textarea
        const note = row.querySelector(".notes");
        note.addEventListener("input", () => {
            note.style.height = "auto";
            note.style.height = note.scrollHeight + "px";
        });

        // Delete row
        row.querySelector(".delete-row").addEventListener("click", () => {
            row.remove();
        });

        return row;
    }

    function createSelect(optionArray, placeholderText) {
        const select = document.createElement("select");

        const inputOption = document.createElement("option");
        inputOption.disabled = true;
        inputOption.selected = true;
        inputOption.hidden = true;
        inputOption.textContent = placeholderText;
        select.appendChild(inputOption);

        optionArray.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });

        const customInput = document.createElement("option");
        customInput.value = "__custom__";
        customInput.textContent = "Add new...";
        select.appendChild(customInput);

        // Replace with prompt input if "__custom__" is selected
        select.addEventListener("change", () => {
            if (select.value === "__custom__") {
                const newVal = prompt(`Enter ${placeholderText.toLowerCase()}:`);
                if (newVal && newVal.trim()) {
                    const exists = [...select.options].some(opt => opt.value === newVal.trim());
                    if (!exists) {
                        const newOption = document.createElement("option");
                        newOption.value = newVal.trim();
                        newOption.textContent = newVal.trim();
                        select.insertBefore(newOption, customInput);
                        select.value = newVal.trim();

                        if (placeholderText.includes("course")) courseOptions.add(newVal.trim());
                        else taskTypeOptions.add(newVal.trim());
                    }
                } else {
                    select.selectedIndex = 0; // Reset to placeholder
                }
            }
        });

        return select;
    }

    function applyStatusClass(row) {
        const status = row.querySelector(".status").value;
        row.classList.remove("status-not-started", "status-in-progress", "status-completed");

        if (status === "Not Started") row.classList.add("status-not-started");
        else if (status === "In Progress") row.classList.add("status-in-progress");
        else if (status === "Completed") row.classList.add("status-completed");
    }

    function sortTable() {
    const rows = Array.from(taskTableBody.querySelectorAll("tr"));
    const statusPriority = {
        "Not Started": 0,
        "In Progress": 1,
        "Completed": 2
    };

    rows.sort((a, b) => {
        const checkedA = a.querySelector(".checked").checked;
        const checkedB = b.querySelector(".checked").checked;

        // Checked tasks go at the bottom
        if (checkedA !== checkedB) {
            return checkedA ? 1 : -1;
        }

        const deadlineA = new Date(a.querySelector(".deadline").value || "9999-12-31T23:59");
        const deadlineB = new Date(b.querySelector(".deadline").value || "9999-12-31T23:59");

        if (deadlineA.getTime() !== deadlineB.getTime()) {
            return deadlineA - deadlineB;
        }

        const statusA = statusPriority[a.querySelector(".status").value] ?? 3;
        const statusB = statusPriority[b.querySelector(".status").value] ?? 3;

        return statusA - statusB;
    });

    rows.forEach(row => taskTableBody.appendChild(row));
}

});
