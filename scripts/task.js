// Reson why Task is capitalized is because it is easier to identify it as a class, and not a function.
class Task{
    // These constructors came from the HTML 
    constructor(title, description, color, date, status, budget){
    //  attributes   objects
        this.title = title;
        this.desc = description;
        this.color = color;
        this.date = date;
        this.status = status;
        this.budget = budget;
    }
}

/*
HTML inputs
       ↓
JavaScript values
       ↓
Task constructor
       ↓
Task object
*/
