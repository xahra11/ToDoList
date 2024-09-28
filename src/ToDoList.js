let TaskList = [];
let GoalsList = [];
let islandLevel = 0;

function addToTaskList(){
    const name = "";
    const category = "";
    const check = false;
    const task = {
        name: name,
        category: category,
        check: check
    }
    TaskList.push(task);

    //if not added yet, add the new task's goal to the GoalsList array
    if (GoalsList.length == 0)
        GoalsList.push(category);
    GoalsList.forEach(i)
    {
        if (GoalsList[i]===category)
            break;
        if (i == GoalsList.length-1)
            GoalsList.push(category);
    }
    renderTaskList();
}

function renderTaskList(){
    let display =  ``;
    List.forEach(i)
    {
        const html = `
        <div class = "listRow">
            <div>${TaskList[i].name}</div>
            <div>${TaskList[i].category}</div>
            <input class = "checkboxhtml${i}" type = "checkbox${i}" onclick = "levelUp(); if (checkboxhtml${i}.checked) TaskList[i].check=true;"></input>
        </div>`;

        display+=html;
    }

    document.querySelector(".ToDoList").innerHTML = display;
}

function levelUp(){
    for (let i = 0; i<GoalsList.length; i++){
        let checked = true;
        for (let j = 0; j<TaskList.length; j++){
            if (TaskList[j].category === GoalsList[i] && !TaskList[i].checked)
                checked = false;
        }
        
        if (checked)
            document.querySelector(".island").innerHTML = `<img src = "island${islandLevel+1}.png">`;
            document.querySelector(".creature").innerHTML = `<img src = "creature${islandLevel+1}.png">`;
    }

}

renderTaskList();
