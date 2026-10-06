// API = Address of the task server
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";
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
    // function init(){
    // init --> wait until the event happens
    // init() --> execute it NOW  

    //console.log("hello from the init");
//}

// window.onload = init;
// function init{} wait until the page loads, then execute init 
// force that the html and the css gets resolved before
// that i execute the logic

function saveTask(){

    console.log("Saving task");

    // 1. Get values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();


    // 2. Start by assuming there are no errors
    let hasError = false;


    // Clear old red borders
    $("#txtTitle").css("border", "");
    $("#txtDescription").css("border", "");
    $("#selColor").css("border", "");
    $("#selDate").css("border", "");
    $("#selStatus").css("border", "");
    $("#numBudget").css("border", "");


    // 3. Validate inputs
    if(title === ""){
        $("#txtTitle").css("border", "solid 2px red");
        hasError = true;
    }

    if(desc === ""){
        $("#txtDescription").css("border", "solid 2px red");
        hasError = true;
    }

    if(color === ""){
        $("#selColor").css("border", "solid 2px red");
        hasError = true;
    }

    if(date === ""){
        $("#selDate").css("border", "solid 2px red");
        hasError = true;
    }

    if(status === ""){
        $("#selStatus").css("border", "solid 2px red");
        hasError = true;
    }

    if(budget === ""){
        $("#numBudget").css("border", "solid 2px red");
        hasError = true;
    }


    // 4. Only continue if validation passed
    if(hasError === false){

        const taskToSave = new Task(
            title,
            desc,
            color,
            date,
            status,
            budget
        );

        console.log(taskToSave);


        // 5. Send Task to server
        $.ajax({

            type: "POST",// http verb: CREATE
            url: API,
            data: JSON.stringify(taskToSave), // Convert the object to a string so the server can understand it
            contentType: "application/json", // Tell the server what kind of data we are sending

            success: function(created){ // created is just the variable name for the response from the server

                console.log(created);

                displayTask(created); // Reuse our display function to show the task

                // Clear form fields
                $("#txtTitle").val("");
                $("#txtDescription").val("");
                $("#selColor").val("#000000");
                $("#selDate").val("");
                $("#selStatus").val("");
                $("#numBudget").val("");

            },

            error: function(fails){

                console.log(fails);

            }

        });


    
    }
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

    // Inject the new HTML into the DOM Tree
    $(".list").append(syntax);
}

function loadTasks(){
    // AJAX = Asynchronous JavaScript and XML 
    //Allows to communicate with a server without refreshing the page

    $.ajax({

        type: "GET", // http verb: READ

        url: API,    // Desitnation of the server

        dataType: "json", // Expected format of the response

        success: function(data){

            console.log("Server responded with: ", data);

            // Clear first, so repeat calls don't duplicate
            $(".list").empty();

            // Looping through every task
            for(let i = 0; i < data.length; i++){

                displayTask(data[i]); // Reuse our display function to show the task

            }

        },

        error: function(err){

            console.error("Error fetching data", err);

        }

    });
}

function update(){
    $.ajax({
        type : "PUT", // http verb: Update
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/1",
        data: JSON.stringify({
            title:"New message"
        }),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(failure){
            console.log(failure);
        }

    })
}

function init(){

    console.log("App initialized");

    // Hookup the Save Button
    $("#btnSave").click(saveTask);
    // Load Data from the server immediately
    loadTasks();
}

window.onload = init;

// New way to use backticks , old way "Hello" + name + "!"

/* 
const name = "Angelina";
let message = `Hello ${name}`; 
*/

// JSON = common way for programs to exchange data. It is a text format that looks like an object, but it is not an object. It is a string.

/* Example of JSON
[
    {
        "title": "Pay Bills",
        "desc": "Electric bill",
        "status": "New"
    }
]
*/
