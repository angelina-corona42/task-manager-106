// API = Address of the task server
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";


/*
YOUR BROWSER                         SERVER

"Give me my tasks"
      │
      ├──────────────────────────→
      │
      │                         finds tasks
      │
      │←──────────────────────────
      │
receives tasks
*/


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

            type: "POST", // HTTP verb: CREATE

            url: API,

            // Convert the object to a string
            // so the server can understand it
            data: JSON.stringify(taskToSave),

            // Tell the server what kind of data we are sending
            contentType: "application/json",

            success: function(created){

                // created = response from server
                console.log(created);

                // Reuse display function
                displayTask(created);


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
        <div 
            id="${task.id}"
            class="task"
            style="border-left-color:${task.color}"
        >

            <div class="info">

                <h4>${task.title}</h4>

                <p>${task.desc}</p>

            </div>


            <label class="status">
                ${task.status}
            </label>


            <div class="date-budget">

                <label>
                    Due: ${task.date}
                </label>

                <label>
                    Budget: $${task.budget}
                </label>

            </div>


            <button class="btn-delete">
                Delete
            </button>

        </div>
    `;


    // Inject the new HTML into the DOM Tree
    $(".list").append(syntax);
}



function loadTasks(){

    // AJAX = Asynchronous JavaScript and XML
    // Allows us to communicate with a server
    // without refreshing the page

    $.ajax({

        type: "GET", // HTTP verb: READ

        url: API, // Destination of the server

        dataType: "json", // Expected format of response


        success: function(data){

            console.log(
                "Server responded with: ",
                data
            );


            // Clear first so repeat calls
            // do not duplicate tasks
            $(".list").empty();


            // Loop through every task
            for(let i = 0; i < data.length; i++){

                // Reuse our display function
                displayTask(data[i]);
            }
        },


        error: function(err){

            console.error(
                "Error fetching data",
                err
            );
        }

    });
}



function update(){

    $.ajax({

        type: "PUT", // HTTP verb: UPDATE

        url: API + "/1",

        data: JSON.stringify({

            title: "New message"

        }),

        contentType: "application/json",


        success: function(response){

            console.log(response);
        },


        error: function(failure){

            console.log(failure);
        }

    });
}



function deleteTask(){

    console.log("Deleting task");


    // 1. 'this' is the specific
    // Delete button that was clicked
    let btn = $(this);


    // 2. Find the parent div
    // with the class task
    let taskElement = btn.parents(".task");


    // 3. Get the ID saved in the HTML
    let id = taskElement.attr("id");


    console.log(id);


    // DELETE the selected Task
    $.ajax({

        type: "DELETE",

        url: API + "/" + id,


        success: function(){

            // Remove task from screen
            // only after server succeeds
            taskElement.fadeOut(
                500,
                function(){

                    $(this).remove();
                }
            );
        },


        error: function(failure){

            console.log(failure);
        }

    });
}



// DELETE ALL TASKS
function deleteAllTasks(){

    console.log("Deleting all tasks");


    // Find every Task currently displayed
    let tasks = $(".task");


    // If there are no Tasks, stop
    if(tasks.length === 0){

        alert("There are no tasks to delete.");

        return;
    }


    // Ask before deleting everything
    let answer = confirm(
        "Are you sure you want to delete all tasks?"
    );


    if(answer === false){

        return;
    }


    // Loop through every Task
    tasks.each(function(){

        // 'this' is the current Task
        // during this loop
        let taskElement = $(this);


        // Read the server ID
        let id = taskElement.attr("id");


        console.log(
            "Deleting task ID:",
            id
        );


        // Delete that specific Task
        $.ajax({

            type: "DELETE",

            url: API + "/" + id,


            success: function(){

                taskElement.fadeOut(
                    500,
                    function(){

                        $(this).remove();
                    }
                );
            },


            error: function(failure){

                console.log(
                    "Error deleting task:",
                    id,
                    failure
                );
            }

        });
    });
}



function filter(status){

    // IMPORTANT:
    // Your buttons send "All"
    // so this must also say "All"
    if(status === "All"){

        $(".task").show();

    }else{

        // Hide every Task first
        $(".task").hide();


        // Show only Tasks that match
        $(".task").each(function(){

            let taskStatus =
                $(this)
                .find(".status")
                .text()
                .trim();


            if(taskStatus === status){

                $(this).show();
            }
        });
    }
}



function init(){

    console.log("App initialized");


    // Hookup the Save Button
    $("#btnSave").click(saveTask);


    // Filter buttons
    $("#btnAll").click(function(){

        filter("All");
    });


    $("#btnDone").click(function(){

        filter("Completed");
    });


    $("#btnNew").click(function(){

        filter("New");
    });


    // Delete All button
    $("#btnDeleteAll").click(
        deleteAllTasks
    );


    /*
    The regular way would not work well
    because Delete buttons are created
    dynamically:

    $(".btn-delete").click(deleteTask);
    */


    // Event Delegation:
    // Listen inside .list.
    // If the target is .btn-delete,
    // run deleteTask.
    $(".list").on(
        "click",
        ".btn-delete",
        deleteTask
    );


    // Load Data from server immediately
    loadTasks();
}


window.onload = init;



// New way to use backticks:
//
// Old:
// "Hello " + name + "!"
//
// New:
// `Hello ${name}`


/*
JSON = common way for programs
to exchange data.

It is a text format that looks
like an object, but it is a string.

Example:

[
    {
        "title": "Pay Bills",
        "desc": "Electric bill",
        "status": "New"
    }
]
*/