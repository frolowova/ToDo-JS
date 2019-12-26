"use strict";

export let countTotal = 0;
export let countComplete = 0;
export const linkTo = {
    inputClass: ".inp-tsk-js",
    listClass: ".list-tasks-js",
    btnSave: ".btn-js",
    divNoTasksYet: ".no-tasks-js",
    divTotalCount: ".total-tasks__count-js",
    divCompleteCount: ".completed-tasks__count-js"
}

export function addTask() {
    const messageFromInput = inputRead(linkTo.inputClass);

    // Если поле не пустое, то добавляем значение input в поле задач (тасков)
    if (messageFromInput) {
        addItemTask(messageFromInput, linkTo.listClass);
        inputClear(linkTo.inputClass);
        countTotal++;
        editCountTotal(countTotal, linkTo.divNoTasksYet, linkTo.divTotalCount);
    }
}


export function delTask(e) {
    // Проверяем удаляемая функция отмечена ли как выполненная.
    let taskComplished = e.target.parentNode.firstChild.checked;
    if (taskComplished) {
        countComplete--;
        viewCountComplete(countComplete, linkTo.divCompleteCount);
    }

    // Удаляем родитель кнопки close на которой было событие. Но может не работать в старых браузерах
    e.target.parentNode.remove();
    countTotal--;
    editCountTotal(countTotal, linkTo.divNoTasksYet, linkTo.divTotalCount);
}


export function doneTask(e) {
    // Если задача отмечена как выполненная
    if (e.target.checked) {
        // соседний элемент справа зачёркиваем
        e.target.nextElementSibling.style.setProperty("text-decoration", "line-through");
        e.target.nextElementSibling.style.setProperty("opacity", ".3");
        countComplete++;
    }
    // Если задача отмечена как невыполнена
    if (!e.target.checked) {
        // соседний элемент справа зачёркиваем
        e.target.nextElementSibling.style.setProperty("text-decoration", "none");
        e.target.nextElementSibling.style.setProperty("opacity", "1");
        countComplete--;
    }

    viewCountComplete(countComplete, linkTo.divCompleteCount);
}




function addItemTask(message, listClass) {
    const taskConntainer = document.querySelector(listClass);
    let itemTask = document.createElement("div");

    itemTask.className = "item-task";
    itemTask.innerHTML = `<input type="checkbox" class="done" /> 
    <div class="txt" contentEditable="true" title="Изменить">${message} </div>
    <span class="edit-task" title="Сохранить изменения"></span>
    <span class="close"></span>`;

    taskConntainer.append(itemTask);
}

function inputRead(inputClass) {
    return document.querySelector(inputClass).value;
}

function inputClear(inputClass) {
    document.querySelector(inputClass).value = "";
}

function viewCountComplete(countComplete, divCompleteCount) {
    document.querySelector(divCompleteCount).innerHTML = `${countComplete}`;
}

// Отображение счётчика общего количества задач. 
// А также контроль отображения блока с ифнормацией о том, что пока нет ни одной записи
function editCountTotal(countTotal, divNoTasksYet, divTotalCount) {
    const noTasks = document.querySelector(divNoTasksYet);
    const divTotal = document.querySelector(divTotalCount);

    if (countTotal > 0) {
        noTasks.style.display = "none";
    } else {
        noTasks.style.display = "block";
    }

    divTotal.innerHTML = `${countTotal}`;
    return countTotal;
}