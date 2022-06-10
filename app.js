//selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener("click", filterTodo)


//functions

function addTodo(event){
    //Prevent form from submitting 
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item"); 
    todoDiv.appendChild(newTodo);
    // ADD todo to local storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = "";
}
function deleteCheck(event){
    const item = event.target;
    //delete Todo 
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function (){
            todo.remove();
        });
    }

    //completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(event){
    const todo = todoList.childNodes;
    todo.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted" :
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else { 
                    todo.style.display = "none"
                }
                break;
        }
    });
}
 // local storage

function localStorageCheck(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos
}
function saveLocalTodos(todo) {
    //CHECK  is this already here
    localStorageCheck(todo)
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //CHECK  is this already here
    if(localStorage.getItem('todos') === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item"); 
    todoDiv.appendChild(newTodo);

    //Check Mark Button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    }); 

}

function removeLocalTodos(todo){
    localStorageCheck(todo)
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1); 
    localStorage.setItem('todos', JSON.stringify(todos));
}
 