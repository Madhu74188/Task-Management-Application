document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("taskInput");
    const button = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    button.addEventListener("click", function () {

        const task = input.value.trim();

        if (task === "") {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");
        li.textContent = task;

        taskList.appendChild(li);

        input.value = "";
    });

});