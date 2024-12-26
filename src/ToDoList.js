let TaskList = []; // array of every task
let CategoryList = []; // array of categories
let islandLevel = 0; // user's current island level

// add a task to the TaskList array
function addToTaskList(icon,name, category){
    const check = false;
    const task = {
        icon: icon, //k wait for the icons i still need to figure out how to put an input selection of emojis like on notion
        name: name,
        category: category,
        check: check
    }
    TaskList.push(task);
    renderCategoryTaskList(category);
}

// add a category to the CategoryList
function addCategory(newCategory){
    if (!CategoryList.includes(newCategory)) {
        CategoryList.push(newCategory);
    }
    renderCategoryTaskList(newCategory);
}

// display list of tasks for one category
function renderCategoryTaskList(categoryName){
    let display = ``;

    TaskList.forEach((task, i) => {
        if (task.category === categoryName) { 
            const html = `
                <div class="listRow">
                <div class="category-list-task-icon"></div>
                    <div class="category-list-task-name">${task.name}</div>
                    <div class="category-list-task-category">${task.category}</div>
                    <input class="checkboxhtml${i}" type="checkbox" ${task.check ? 'checked' : ''} onclick="toggleTaskCheck(${i})"></input>
                </div>`;
            display += html;
        }
    });
    document.querySelector(`.${categoryName}-task-list`).innerHTML = display; 
}

//check an uncompleted task as "completed" and a completed task as "uncompleted"
function toggleTaskCheck(i) {
    TaskList[i].check = !TaskList[i].check;
    levelUp();
}

// level up when a goal is reached
function levelUp(){
    let allCategoriesCompleted = true;

    for (let i = 0; i < CategoryList.length; i++) {
        let checked = true;
        for (let j = 0; j < TaskList.length; j++) {
            if (TaskList[j].category === CategoryList[i] && !TaskList[j].check) {
                checked = false;
                break; 
            }
        }

        if (checked) {
            // if all tasks in one category are checked, update island level and display the next level creature/island images
            islandLevel++;
            document.querySelector(".island").innerHTML = `<img src="island${islandLevel}.png">`;
            document.querySelector(".creature").innerHTML = `<img src="creature${islandLevel}.png">`;
        } else {
            allCategoriesCompleted = false;
            break;
        }
    }

    if (!allCategoriesCompleted) {
        return 0;
    }
}

function displayCategoryInput() {
    document.querySelector('.categoryInputPrompt').innerHTML = `
        <button class="exit-button" onclick="document.querySelector('.categoryInputPrompt').innerHTML = '';">X</button>
        <input class="category-name-input" placeholder="New Category Name">
        <button class="category-add-button" onclick="addCategory(document.querySelector('.category-name-input').value)">Add Category</button>
    `;
}

//display task input prompt
function displayTaskInput(){
    document.querySelector('.TaskInputPrompt').innerHTML = `
        <button class="exit-button"></button>
        <input class="category-name-input" placeholder="New Category Name">
        <button class="category-add-button"></button>
    `;
    }
// display each category's task list when you first open the website
CategoryList.forEach(category => renderCategoryTaskList(category));
