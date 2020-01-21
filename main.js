"use strict";
import { linkTo, addTask, delTask, doneTask } from "./todo.js"
// linkTo - это объект с ссылками указывающий на соответсвующие классы в html
// в случае необходимости их можно переопределить в данном скрипте.
// linkTo.inputClass = ".inp-tsk-js"
// linkTo.listClass = ".list-tasks-js"
// linkTo.btnSave = ".btn-js"


document.addEventListener('DOMContentLoaded', function () {

    // Задаём высоту приложения =100% но не зависящую от строки поиска в мобильной версии
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

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


    // Слушаем изменение размера окна, чтобы точно подстроить vh под него
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
})