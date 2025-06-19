document.addEventListener('DOMContentLoaded', function() {
    // Days of the week array
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // Initialize all days
    days.forEach(day => {
        const inputBox = document.getElementById(`${day}Box`);
        const taskList = document.getElementById(`${day}-list`);
        
        // Create add task function for each day
        const addTaskFunction = function() {
            if(inputBox.value.trim() === '') {
                alert("Please add a task");
                return;
            }
            
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            
            taskList.appendChild(li);
            inputBox.value = "";
            saveData(day);
        };

        // Assign to global scope
        window[`add${day.charAt(0).toUpperCase() + day.slice(1)}Task`] = addTaskFunction;
        
        // Enter key event for each day
        if (inputBox) {
            inputBox.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    addTaskFunction();
                }
            });
        }
        
        // Click events for each task list
        if (taskList) {
            taskList.addEventListener("click", function(e) {
                if(e.target.tagName === "LI") {
                    e.target.classList.toggle("checked");
                    saveData(day);
                } else if(e.target.tagName === "SPAN") {
                    
                        e.target.parentElement.remove();
                        saveData(day);
                    
                }
            }, false);
        }
        
        // Load saved tasks for each day
        loadData(day);
    });

    // Save tasks to localStorage
    function saveData(day) {
        const taskList = document.getElementById(`${day}-list`);
        if (taskList) {
            localStorage.setItem(`${day}Data`, taskList.innerHTML);
        }
    }

    // Load tasks from localStorage
    function loadData(day) {
        const taskList = document.getElementById(`${day}-list`);
        const savedData = localStorage.getItem(`${day}Data`);
        if (taskList && savedData) {
            taskList.innerHTML = savedData;
        }
    }
});