let tasks = [];

document.getElementById("taskForm").addEventListener("submit", function (e){
    e.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;
    if (name === "") {
        alert("Task cannot be empty!");
        return;
    }
    const task = {
        id: Date.now(),
        name,
        priority,
        deadline,
        completed: false
    };
    tasks.push(task);
    this.reset();
    displayTasks();
});

function displayTasks() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    tasks.forEach(task => {
        const isOverdue = new Date(task.deadline) < new Date() && !task.completed;

        const div = document.createElement("div");
        div.className = "col-md-4";

        div.innerHTML = `
            <div class="card p-3 ${isOverdue ? 'border border-danger' : ''}">
                <h5 class="${task.completed ? 'text-decoration-line-through' : ''}">
                    ${task.name}
                </h5>
                <p>Priority: ${task.priority}</p>
                <p>Deadline: ${task.deadline}</p>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-sm btn-success" onclick="toggleTask(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
    updateCounts();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

function updateCounts() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText = tasks.filter(t => t.completed).length;
    document.getElementById("pending").innerText = tasks.filter(t => !t.completed).length;
}
