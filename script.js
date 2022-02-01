//      UI vars


const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btn_delete_all = document.querySelector("#btnDeleteAll");
const task_list = document.querySelector("#task-list");
let items ;


//   load items

loadItems();


//   calling event listeners
eventListeners();



function eventListeners(){
    //  submit events
    form.addEventListener("submit",addNewItem);

    //  delete item
    task_list.addEventListener("click",deleteItem);

    //  delete all items
    btn_delete_all.addEventListener("click",deleteAllItems);

}


//  add new item
function addNewItem(event){
    if(input.value === ""){
        alert("add new item");
    }    

    //  create item
    createItem(input.value);

    //  save to local storage

    setItemToLS(input.value);

    //  clear input
    input.value = "";

    event.preventDefault();
}

//  delete item
function deleteItem(event){

    if(event.target.className === "fas fa-times"){
        if(confirm("are you sure ?")){
            event.target.parentElement.parentElement.remove();

            //  delete item from local storage
            deleteItemFromLS(event.target.parentElement.parentElement.textContent);
        }
    } 

    event.preventDefault();
    
}

function deleteItemFromLS(text){

    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
        
    });

    localStorage.setItem("items",JSON.stringify(items));
}

function deleteAllItems(event){

    //  task_list.innerHTML = "";

    if(confirm("are you sure ? ")){

        //task_list.innerHTML = "";

        
        // task_list.childNodes.forEach(function(item){
        //     if(item.nodeType === 1){
        //         item.remove();
        //     }
        // });

        while(task_list.firstChild){
            task_list.removeChild(task_list.firstChild);
        }

        localStorage.clear();

    }
    event.preventDefault();
}

function loadItems(){

    items = getItemFromLS();

    items.forEach(function(item){
        createItem(item);
    });
}

//  get items from local storage
function getItemFromLS(){
    
    if(localStorage.getItem("items") === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem("items"));
    }

    return items;
}

//  set items to local storage

function setItemToLS(text){

    items = getItemFromLS();
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));

}

function createItem(text){

    //  create li
    const li = document.createElement("li");
    li.className  = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    //  create a 
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    //  add a to li
    li.appendChild(a);

    //  add li to ul
    task_list.appendChild(li);
}