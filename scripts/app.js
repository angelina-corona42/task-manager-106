// API = Address of the task server

/* YOUR BROWSER                SERVER

"Give me my tasks"
      │
      ├──────────────→
      │
      │                     finds tasks
      │
      │←──────────────
      │
 receives tasks 
 */

const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function init(){
    // init --> wait until the event happens
    // init() --> execute it NOW  

    console.log("hello from the init");
}

window.onload = init;
// function init{} wait until the page loads, then execute init 
// force that the html and the css gets resolved before
// that i execute the logic

function saveTask(){

    console.log("Saving task");

    // Read the values of each of the six inputs
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // Build an object using our model
    const taskToSave = new Task(
        title,
        desc,
        color,
        date,
        status,
        budget
    );

    console.log(taskToSave);

    displayTask(taskToSave);
}
function displayTask(task){

    let syntax = `
        <div class="task" style="border-left-color:${task.color}">
            <div class="info">
                <h4>${task.title}</h4>
                <p>${task.desc}</p>
            </div>

            <label class="status">${task.status}</label>

            <div class="date-budget">
                <label>Due: ${task.date}</label>
                <label>Budget: $${task.budget}</label>
            </div>
        </div>
    `;

    $(".list").append(syntax);
}
function loadTasks(){
    // AJAX = Asynchronous JavaScript and XML 
    //Allows to communicate with a server without refreshing the page

    $.ajax({

        type: "GET",

        url: API,

        dataType: "json",

        success: function(data){

            console.log("Server responded with: ", data);

            // Clear first, so repeat calls don't duplicate
            $(".list").empty();

            // Looping through every task
            for(let i = 0; i < data.length; i++){

                displayTask(data[i]);

            }

        },

        error: function(err){

            console.error("Error fetching data", err);

        }

    });
}

function init(){

    console.log("App initialized");

    $("#btnSave").click(saveTask);

    loadTasks();
}

window.onload = init;

// New way to use backticks , old way "Hello" + name + "!"

/* 
const name = "Angelina";
let message = `Hello ${name}`; 
*/

// JSON = common way for programs to exchange data. It is a text format that looks like an object, but it is not an object. It is a string.

[
    {
        "title": "Pay Bills",
        "desc": "Electric bill",
        "status": "New"
    }
]

