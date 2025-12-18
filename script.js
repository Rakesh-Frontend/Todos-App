let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  let data = localStorage.getItem("todoList");
  return data === null ? [] : JSON.parse(data);
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusChange(labelId, todoId) {
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todo = todoList.find(todo => "todo" + todo.uniqueNo === todoId);
  todo.isChecked = !todo.isChecked;
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let index = todoList.findIndex(
    todo => "todo" + todo.uniqueNo === todoId
  );
  todoList.splice(index, 1);
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isChecked;
  checkbox.classList.add("checkbox-input");
  checkbox.onclick = function () {
    onTodoStatusChange(labelId, todoId);
  };
  labelContainer.appendChild(checkbox);

  let label = document.createElement("label");
  label.id = labelId;
  label.textContent = todo.text;
  label.classList.add("checkbox-label");
  if (todo.isChecked) label.classList.add("checked");
  labelContainer.appendChild(label);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  labelContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

addTodoButton.onclick = function () {
  let userInput = document.getElementById("todoUserInput");
  let value = userInput.value.trim();

  if (value === "") {
    alert("Enter valid text");
    return;
  }

  todosCount++;

  let newTodo = {
    text: value,
    uniqueNo: todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInput.value = "";
};
