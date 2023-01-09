import { createEvent } from "./backend.js";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputDescription = document.querySelector(".input-description");
const buttonSubmit = document.querySelector(".button-submit");
const inputs = [...document.querySelectorAll("input")];

//set listener on submit button 
buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isInputListEmpty()) {
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

        //send new event to backend (imported function)
        createEvent(newEvent);
    }
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

function isInputListEmpty() {
    let isEmpty = false;
    inputs.forEach(input => {
        if (input.value.length < 3) {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "Please enter a value");
            isEmpty = true;
        } else if (input.value.length > 256) {
            input.style.borderColor = "red";
            input.setAttribute("placeholder", "Please enter a value less than 256");
            isEmpty = true;
        } else {
            input.style.borderColor = "white";

        }
    });
    return isEmpty;
}