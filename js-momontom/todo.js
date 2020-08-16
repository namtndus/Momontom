const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input");
const pending = document.querySelector(".js-add"),
  finished = document.querySelector(".js-check");
let tasks = [];
let finishTasks = [];
const TASK = "PENDING";
const ENDTASK = "FINISHED";

function returnTask(event) {
  const rtBtn = event.target;
  const rtpre = rtBtn.previousSibling.previousSibling;
  const rtparLi = rtBtn.parentNode;
  finished.removeChild(rtparLi);
  const cleanToDos = finishTasks.filter(function (toDo) {
    return toDo.id !== parseInt(rtparLi.id);
  });
  addTask(rtpre.textContent);
  finishTasks = cleanToDos;
  saveTask(ENDTASK, finishTasks);
}

function deleteToDo(event) {
  const btn = event.target;
  const parLi = btn.parentNode;
  pending.removeChild(parLi);
  const cleanToDos = tasks.filter(function (toDo) {
    return toDo.id !== parseInt(parLi.id);
  });
  tasks = cleanToDos;
  saveTask(TASK, tasks);
}

function deleteTasks(event) {
  const delBtn = event.target;
  const delParLi = delBtn.parentNode;
  finished.removeChild(delParLi);
  const cleanToDos = tasks.filter(function (toDo) {
    return toDo.id !== parseInt(delParLi.id);
  });
  finishTasks = cleanToDos;
  saveTask(ENDTASK, finishTasks);
}

function removeTask(event) {
  const rmBtn = event.target;
  const rmpre = rmBtn.previousSibling.previousSibling;
  const rmparLi = rmBtn.parentNode;
  pending.removeChild(rmparLi);
  const cleanToDos = tasks.filter(function (toDo) {
    return toDo.id !== parseInt(rmparLi.id);
  });
  checkTask(rmpre.textContent);
  tasks = cleanToDos;
  saveTask(TASK, tasks);
}

function saveTask(name, array) {
  localStorage.setItem(name, JSON.stringify(array));
}

function checkTask(text) {
  const finishLi = document.createElement("li");
  const checkSpan = document.createElement("span");
  const remBtn = document.createElement("button");
  const returnBtn = document.createElement("button");
  const finishId = finishTasks.length + 1;
  checkSpan.innerText = text;
  remBtn.innerText = "❌";
  remBtn.addEventListener("click", deleteTasks);
  returnBtn.innerText = "↩";
  returnBtn.addEventListener("click", returnTask);
  finishLi.appendChild(checkSpan);
  finishLi.appendChild(remBtn);
  finishLi.appendChild(returnBtn);
  finishLi.id = finishId;
  finished.appendChild(finishLi);
  const finishTaskObj = {
    text: text,
    id: finishId,
  };
  finishTasks.push(finishTaskObj);
  saveTask(ENDTASK, finishTasks);
}

function addTask(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = tasks.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", removeTask);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  pending.appendChild(li);
  const taskObj = {
    text: text,
    id: newId,
  };
  tasks.push(taskObj);
  saveTask(TASK, tasks);
}

function inputTask(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  addTask(currentValue);
  toDoInput.value = "";
}

function loadTacks() {
  const loadedToDos = localStorage.getItem(TASK);
  const finishToDos = localStorage.getItem(ENDTASK);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      addTask(toDo.text);
    });
  }
  if (finishToDos !== null) {
    const endToDos = JSON.parse(finishToDos);
    endToDos.forEach(function (story) {
      checkTask(story.text);
    });
  }
}

function init() {
  loadTacks();
  toDoform.addEventListener("submit", inputTask);
}
init();
