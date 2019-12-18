class toDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!this.tasks) {
         this.tasks = [
            {task: 'Go to Dentist', isComplete: false},
            {task: 'Do Gardening', isComplete: true},
            {task: 'Renew Library Account', isComplete: false},
         ];
       } 
     

        this.loadTasks();
        this.addEventListeners();
    }
    loadTasks() {
        //the taskhtml will return the result of reduce which is the accumation of the return of generateTaskHtml ,which are the 4 li
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index), '');
        // we r replacing the taskList id with the task html value which are strings and we r replacing them to html code wth innerHtml 
        document.getElementById('taskList').innerHTML = tasksHtml;
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    // here we r having a  string for each task index inovked 
    generateTaskHtml(task, index) {
        //
        return `
         <li class="list-group-item checkbox">
          <div class="row">
           <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label><input id="toggleTaskStatus" type="checkbox"  
            onchange="toDo.toggleTaskStatus(${index})" value="" class="" 
            ${task.isComplete ? 'checked' : ''}></label>
           </div>
           <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i 
            id="deleteTask" data-id="${index}" class="delete-icon glyphicon 
            glyphicon-trash"></i></a>
           </div>
          </div>
         </li>
       `;
    }
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }
    deleteTask(event, taskIndex) {
        event.preventDefault();// we used event.preventDefault to prevent the anchor a in the html from opening new page
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
    }
    //this is adding a task with the add button 
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = ""
    }
    addTask(task) {
        let newTask = {
            task,
            isComplete: false,
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            parentDiv.classList.add('has-error');
            alert('You have to add a task first!');
        } else {
            parentDiv.classList.remove('has-error');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }
    addEventListeners() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    }
}
//any function that is passed as an argument is called a callback function
// arrow functions are functions written this way 
//function (){} becomes ()=>{}
// in arrow functions we can remove return and {} for example 
//let sum = function(x, y) {
//   return x + y;
// }
// becomes 
//let sum = (x, y) => x+y;

// let is accessible in its scope 
//for example (let i=0;i<arr.length;i++) the i is only accessible inside the for loop if we call it somewhere else the program is gonn throw and error 
//thr const cant be changed but its proprety can be changed 
//in es6 We need to declare variables using the constructor, we can declare directly class variables
let toDo;
window.addEventListener("load", () => {
    toDo = new toDoClass();
})
