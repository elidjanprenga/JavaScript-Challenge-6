
// This function is created to generate random and unique ID's automatically for each task.
function generateTaskId() {
    return '_' + Math.random().toString(36).substring(2, 9);
  }

//In the array are placed elements that are taken from addtask function or from LS so the elements from LS 
//are displayed correctly for the user.
  const tasksFromLS= JSON.parse(localStorage.getItem('allTasks'));
  let allTasks = tasksFromLS || [];


//Displays the current Date on top of the page

const currentDate = new Date();
const todayDate = document.getElementById('currentDate');
todayDate.textContent=`Today is ${currentDate.toDateString()}`;


    
//Function get's from the user input the task name,time and date and add the task to the list.
//Also it display's an alert if the user tries to add a task without filling in the task name or task time or task date.
//And sets all the lists to LS.This is an onclick function so it is executed after the add Task button is clicked.
function addTask(){
    const taskDcp = document.getElementById('taskDescription').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskDate = document.getElementById('taskDate').value;

    const randomId = generateTaskId();
   
    if (!taskDcp || !taskTime || !taskDate){
        alert('Please complete all the task elements')
    }else{
        
          const newTask = {
        taskID: randomId,
        taskDescription: taskDcp,
        taskTime: taskTime,
        taskDate: taskDate,
    }
    
     allTasks.push(newTask);
    }

    localStorage.setItem('allTasks',JSON.stringify(allTasks))

    displayTasks()
   
}


// The function displays in DOM throught iteration all the tasks the user adds also adds the remove button for each task.
function displayTasks(){
    const taskList = document.getElementById('taskList');
   
    taskList.innerHTML='';
    for(let i=0; i<allTasks.length; i++){
        const selectedTask = allTasks[i];

        const taskLi = document.createElement('li');
        taskLi.setAttribute('class','list-group-item mt-2 d-flex justify-content-between')
       
        const taskDiv = document.createElement('div');
        taskDiv.setAttribute('class','order-1 p-2')
        taskDiv.textContent = `${selectedTask.taskDate} at ${selectedTask.taskTime}: ${selectedTask.taskDescription}`;
       
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class','btn btn-danger order-2 mx-1')
        removeBtn.textContent = 'Remove';

        taskLi.appendChild(removeBtn)
        taskLi.appendChild(taskDiv);
        taskList.appendChild(taskLi);


        //Highlights the task/s whose current date to be done matches the current date of the user’s computer.
        //To compare the date i have removed the generated time from both dates so it can be compared
        // and two dates are checked if are equal or not,also the dates are updated in the same format.

        const isEqualDate = (dateA, dateB) => dateA.toISOString().split('T')[0] === dateB.toISOString().split('T')[0];
        const checkDate = isEqualDate(new Date(selectedTask.taskDate),currentDate)
        if(checkDate){
            taskLi.style.backgroundColor = 'yellow'
        }

        removeBtn.addEventListener('click', () => 
            removeItem(selectedTask.taskID,taskLi)
       
        );
    } 
}
displayTasks();

//Function to remove a task from the list after clicking the remove button.
function removeItem(taskId,li){
   const remained = allTasks.filter(item => item.taskID !== taskId);
    localStorage.setItem('allTasks', JSON.stringify(remained))
   
   //Deletes the excact list we click the button 
   li.parentNode.removeChild(li);
   //I have add the reloading function so if we want to remove more than one element
   //the LS will be updated in real time
  location.reload()
}


  