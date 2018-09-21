let todos = [];
$(document).ready(function () {
 let addbtn = $(`#add`)
 let todo = $(`#todo`)
 let delbtn = $(`#delete`)
 let list = $(`#list`)
   refreshtodos(true);

   delbtn.click(function() {
         todos = todos.filter(function(todo) {
            return  todo.done == false 
             
         })
         refreshtodos();
   })
 addbtn.click(function () {

    let val = todo.val();
    if(!val)
    {
        alert(`please enter a todo`);
    }
    else {
        addtodo(val);
       todo.val("");
    }
 })

 function refreshtodos(firstimeload = false) {

    if(!firstimeload)
    {
     savetodos();
    }

     retrivetodo();
     list.empty();

     for(i in todos)
     {
       let li =   createelement(+i)
    //    console.log(li);
         list.append(li);
     }
 }

   function moveup(i)
   {todos.splice(i-1 , 0 , todos.splice(i , 1)[0]);
    refreshtodos();

   }

   function movedown(i)
   {
    todos.splice(i , 0 , todos.splice(i+1 , 1)[0]);
    refreshtodos();
   }

   function remove(i)
   {
       todos.splice(i , 1);
       refreshtodos();
   }
   function createelement(i)
   {
       let li = $(`<li class ="list-group-item"></li>`)
       let container = $(`<div class ="container"></div>`)
       let row = $(`<div class ="row"></div>`)
       let checkdiv = $(`<div class ="col-1"></div>`)
       let check = $(`<input type ="checkbox">`).click(function () {
           todos[i].done = !todos[i].done ;
           refreshtodos();
       })
           let task = $(`<div class ="col">${todos[i].task}</div>`)
           if(todos[i].done == true)
            {
                task.css("text-decoration" , "line-through");
            }
           let iconup = $(`<div class ="col-1"><i class ="fas fa-chevron-up"></i></div>`).click(function() {
               moveup(i);
           })
           let icondown = $(`<div class ="col-1"><i class="fas fa-chevron-down"></i></div>`).click(function() {
                movedown(i);
           })
           let rem = $(`<div class ="col-1"><i class ="fas fa-times"></i></div>`).click(function() {
                    remove(i);
           })
           li.append(container.append(row.append(checkdiv.append(check)).append(task).append(iconup).append(icondown).append(rem)));
           return li;
       
   }
 function retrivetodo() {
     let item = localStorage.getItem('todos');
     if(item)
     {
         todos = JSON.parse(item);
            
        
        }
 }

 function savetodos() {
     localStorage.setItem('todos' , JSON.stringify(todos))
 }
 function addtodo(task)
 {
     todos.push({
         task : task , 
         done : false 
     })

    //  console.log(todos);
    refreshtodos();
    
 }

})