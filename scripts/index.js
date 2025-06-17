const InputBox=document.getElementById("inputBox");
const listContainer=document.getElementById("list_container");
const looking=document.getElementById("lookingBox");
const lookingItem=document.getElementById("looking_container");

//for adding a new task in daily to-do
function addDailyTask(){
    if(InputBox.value===''){
        alert("you must write something.");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=InputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span")
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    InputBox.value="";
    saveDailyData();
}

//for adding looking ahead item
function addLookingAhead(){
    if(looking.value===''){
        alert("you must write something in looking ahead");
        return ;
    }
    let li=document.createElement("LI");
    li.innerHTML=looking.value;
    lookingItem.appendChild(li);
    let span=document.createElement("SPAN");
    span.innerHTML="\u00d7";
    li.appendChild(span);
    looking.value="";
    saveLookingData();
}
//add task on enter key
InputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addDailyTask();
    }
});

looking.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addLookingAhead();
    }
});
//for checking/unchecking and deleting [update event listeners]
listContainer.addEventListener("click", function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveDailyData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveDailyData();
    }
},false);

lookingItem.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveLookingData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveLookingData();
    }
}, false);

//for saving daily to do
function saveDailyData(){
    localStorage.setItem("dailyData", listContainer.innerHTML);
}
//for saving looking ahead
function saveLookingData(){
    localStorage.setItem("lookingData", lookingItem.innerHTML);
}

//for displaying everytime website is reloaded
function showTask(){
   const dailyData = localStorage.getItem("dailyData");
   const lookingData = localStorage.getItem("lookingData");
    
    if (dailyData) listContainer.innerHTML = dailyData;
    if (lookingData) lookingItem.innerHTML = lookingData;
}
showTask()

