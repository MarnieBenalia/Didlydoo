import { createEvent } from "./backend.js";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputDescription = document.querySelector(".input-description");
const buttonSubmit = document.querySelector(".button-submit");

//set listener on submit button 
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

    createEvent(newEvent); //send new event to backend (imported function)

});

//display aside form
const buttonAdd = document.querySelector(".buttonadd");
const buttonClose = document.querySelector(".button-close");
const aside = document.querySelector("aside");

//set listener to display the aside form
buttonAdd.addEventListener('click', () => {
    aside.style.marginLeft = "0%";

});

//set listener to close the aside form
buttonClose.addEventListener('click', () => {
    aside.style.marginLeft = "-100%";

});