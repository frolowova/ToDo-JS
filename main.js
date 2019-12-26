"use strict";
import { linkTo, addTask, delTask, doneTask } from "./todo.js"

document.addEventListener('DOMContentLoaded', function () {

    // Слушаем клик по кнопке или enter в input-e. ADD TASK
    document.querySelector(linkTo.btnSave).addEventListener("click", addTask)

    document.querySelector(linkTo.inputClass).addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
            addTask();
        }
    })

    // Слушаем клик по крестику. DEL TASK
    document.querySelector(linkTo.listClass).addEventListener("click", e => {
        // Если событие клик было не по кнопке close, то выходим без действий
        if (e.target.className != "close") return;

        delTask(e);
    })

    // Слушаем нажатие на Выполнено (checkbox)    
    document.querySelector(linkTo.listClass).addEventListener("click", e => {
        // Если событие клик было не по кнопке done (checkbox), то выходим без действий
        if (e.target.className != "done") return;

        doneTask(e);
    })
})