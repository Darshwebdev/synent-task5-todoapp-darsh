const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

/* Load tasks when page opens */
document.addEventListener("DOMContentLoaded", loadTasks);

/* Add task button */
addBtn.addEventListener("click", addTask);

/* Enter key support */
taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addTask();
    }

});

/* Add task function */
function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task.");
        return;
    }

    createTask(taskText, false);

    saveTasks();

    taskInput.value = "";
}

/* Create task element */
function createTask(text, completed){

    const li = document.createElement("li");

    li.textContent = text;

    if(completed){
        li.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = "✕";
    deleteBtn.className = "delete-btn";

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

/* Event delegation */
taskList.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        e.target.parentElement.remove();

        saveTasks();
        return;
    }

    if(e.target.tagName === "LI"){

        e.target.classList.toggle("completed");

        saveTasks();
    }
});

/* Save tasks */
function saveTasks(){

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });

    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* Load tasks */
function loadTasks(){

    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTask(
            task.text,
            task.completed
        );

    });
}