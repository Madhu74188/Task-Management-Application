
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("taskInput");
    const button = document.getElementById("addButton");

    const pendingTasks = document.getElementById("pendingTasks");
    const ongoingTasks = document.getElementById("ongoingTasks");
    const completedTasks = document.getElementById("completedTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {

        pendingTasks.innerHTML = "";
        ongoingTasks.innerHTML = "";
        completedTasks.innerHTML = "";

        let pending = 0;
        let ongoing = 0;
        let completed = 0;

        tasks.forEach(function (task) {

            const card = document.createElement("div");
            card.className = "task-card";

            const title = document.createElement("p");
            title.className = "task-title";
            title.textContent = task.name;

            const label = document.createElement("label");
            label.textContent = "Update status";

            const select = document.createElement("select");

            ["Pending", "Ongoing", "Completed"].forEach(function (status) {
                const option = document.createElement("option");
                option.value = status;
                option.textContent = status;

                if (task.status === status) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            select.addEventListener("change", function () {
                task.status = select.value;
                saveTasks();
                renderTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                renderTasks();
            });

            card.appendChild(title);
            card.appendChild(label);
            card.appendChild(select);
            card.appendChild(deleteButton);

            if (task.status === "Pending") {
                pendingTasks.appendChild(card);
                pending++;
            } 
            else if (task.status === "Ongoing") {
                ongoingTasks.appendChild(card);
                ongoing++;
            } 
            else {
                completedTasks.appendChild(card);
                completed++;
            }
        });

        document.getElementById("pendingCount").textContent = pending;
        document.getElementById("ongoingCount").textContent = ongoing;
        document.getElementById("completedCount").textContent = completed;

        document.getElementById("totalTasks").textContent =
            tasks.length + (tasks.length === 1 ? " Task" : " Tasks");
    }

    function addTask() {

        const taskName = input.value.trim();

        if (taskName === "") {
            alert("Please enter a task!");
            return;
        }

        tasks.push({
            id: Date.now(),
            name: taskName,
            status: "Pending"
        });

        saveTasks();
        renderTasks();

        input.value = "";
        input.focus();
    }

    button.addEventListener("click", addTask);

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    renderTasks();

});
