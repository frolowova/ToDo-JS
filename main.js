"use strict";

window.onload = function () {

    let countTotal = 0;
    let countComplete = 0;

    addTask();
    delTask();
    editTask();
    doneTask();
    viewcountComplete();



    // Добавляем таску на страницу
    function addItemTask(message) {
        const taskConntainer = document.querySelector(".list-tasks-js");
        let itemTask = document.createElement("div");

        itemTask.className = "item-task";
        itemTask.innerHTML = `<input type="checkbox" class="done" /> ${message} <span class="edit-task"></span><span class="close"></span>`;

        taskConntainer.append(itemTask);
    }

    //Возращаем значение input
    function inputRead() {
        const messageFromInput = document.querySelector(".inp-tsk-js");
        return messageFromInput.value;
    }

    // Чистим Input
    function inputClear() {
        const messageFromInput = document.querySelector(".inp-tsk-js");
        messageFromInput.value = "";
    }

    // Выводим countTotal (сколько всего задач)
    function editCountTotal() {
        const divTotal = document.querySelector(".total-tasks__count")
        divTotal.innerHTML = `${countTotal}`;
    }

    // Выводим completeTotal (сколько выполненных задач)
    function viewcountComplete() {
        const divCompleted = document.querySelector(".completed-tasks__count")
        divCompleted.innerHTML = `${countComplete}`;
    }

    // Функция следит за значением счётчика общего количества задач
    function taskCountTotal(count, val) {
        if (val == "plus") countTotal++;
        if (val == "minus") countTotal--;
        if (countTotal > 0) {
            const noTasks = document.querySelector(".no-tasks");
            noTasks.style.display = "none";
        } else {
            const noTasks = document.querySelector(".no-tasks");
            noTasks.style.display = "block";
        }
    }


    // Слушаем клик по кнопке или enter в input-e. ADD TASK
    function addTask() {
        document.querySelector(".btn").addEventListener("click", () => {
            const messageFromInput = inputRead();
            // Если поле не пустое, то добавляем значение input в поле задач (тасков)
            if (messageFromInput) {
                addItemTask(messageFromInput);
                inputClear();
                taskCountTotal(countTotal, "plus");
                editCountTotal();
            }
        })

        document.querySelector(".inp-tsk-js").addEventListener("keydown", (e) => {
            // Если нажат Enter
            if (e.keyCode === 13) {
                const messageFromInput = inputRead();
                // Если поле не пустое, то добавляем значение input в поле задач (тасков)
                if (messageFromInput) {
                    addItemTask(messageFromInput);
                    inputClear();
                    taskCountTotal(countTotal, "plus");
                    editCountTotal();
                }
            }
        })
    }


    // Функция удалающая задачу из списка
    function delTask() {
        document.querySelector(".list-tasks-js").addEventListener("click", e => {
            // Если событие клик было не по кнопке close, то выходим без действий
            if (e.target.className != "close") return;

            // Проверяем удаляемая функция отмечена ли как выполненная.
            let taskComplished = e.target.parentNode.firstChild.checked;
            if (taskComplished) {
                countComplete--;
                viewcountComplete();
            }

            // Удаляем родитель кнопки close на которой было событие. Но может не работать в старых браузерах
            e.target.parentNode.remove();
            taskCountTotal(countTotal, "minus");
            editCountTotal();
        })
    }


    function editTask() {
        document.querySelector(".list-tasks-js").addEventListener("click", e => {
            // Если событие клик было не по кнопке редактирования, то выходим без действий
            if (e.target.className != "edit-task") return;

            const inputTask = document.querySelector(".inp-tsk-js");
            let messageToEdit = e.target.parentNode.innerText;
            inputTask.value = messageToEdit;
            console.log("edit" + inputTask.value)

            // Далее слушаем . Если esc, то отменяем что либо. 
            // Если enter или Кнопка записать, то innerHTML
            document.querySelector(".inp-tsk-js").addEventListener("keydown", (e) => {
                // Если нажат Esc
                if (e.keyCode === 27) {
                    inputClear();
                    return;
                }
            })

            document.querySelector(".btn").addEventListener("click", () => {
                inputTask.innerHTML = inputTask.value;
                inputClear();
            })

            document.querySelector(".inp-tsk-js").addEventListener("keydown", (e) => {
                // Если нажат Enter
                if (e.keyCode === 13) {
                    const messageFromInput = inputRead();
                    console.log("edit" + inputTask.value)
                    // Если поле не пустое, то добавляем значение input в поле задач (тасков)
                    if (messageFromInput) {
                        inputTask.innerHTML = messageFromInput;
                        inputClear();
                    }
                }

            })
        })
    }


    // Функция отображающая, что задача выполнена
    function doneTask() {
        document.querySelector(".list-tasks-js").addEventListener("click", e => {
            // Если событие клик было не по кнопке done (checkbox), то выходим без действий
            if (e.target.className != "done") return;

            // Если задача отмечена как выполненная
            if (e.target.checked) {
                e.target.parentNode.style.setProperty("text-decoration", "line-through");
                e.target.parentNode.style.setProperty("color", "#cac4b0");
                countComplete++;
            }
            // Если задача отмечена как невыполнена
            if (!e.target.checked) {
                e.target.parentNode.style.setProperty("text-decoration", "none");
                e.target.parentNode.style.setProperty("color", "#000000");
                countComplete--;
            }

            viewcountComplete();
        })
    }
}