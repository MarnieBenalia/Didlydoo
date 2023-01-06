import { createEvent } from "./backend.js";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputDescription = document.querySelector(".input-description");
const buttonSubmit = document.querySelector(".button-submit");


buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let dates = [];
    for (let inputDate of document.querySelectorAll(".input-date")) {
        dates.push(inputDate.value);
    }
    let newEvent = {
        name: inputTitle.value,
        dates: dates,
        author: inputAuthor.value,
        description: inputDescription.value,
    };

    createEvent(newEvent);

});

//---------------------------------------------------------------------------------------------------------//

const BUTTON = document.querySelector(".buttonadd");
const ASIDE = document.querySelector("aside");

BUTTON.addEventListener('click', () => {

    ASIDE.style.display = "flex";
})