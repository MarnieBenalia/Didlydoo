import { updateEvent } from "./backend.js";

const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputDescription = document.querySelector(".input-description");
const ASIDE = document.querySelector("aside");
const buttonSubmit = document.querySelector(".button-submit");
const buttonUpdate = document.createElement("button");

export function editDataEvent(event) {
    ASIDE.style.display = "flex";
    ASIDE.style.marginLeft = "0%";
    inputTitle.value = event.name;
    inputAuthor.value = event.author;
    inputDescription.value = event.description;

    buttonUpdate.innerText = "Update"
    ASIDE.appendChild(buttonUpdate);
    buttonSubmit.style.display = "none"

    let inputDateList = document.querySelectorAll(".input-date");
    inputDateList.forEach(inputDate => {
        inputDate.setAttribute("hidden", "true");
        inputDate.innerText = "";

    });

    buttonUpdate.addEventListener("click", async (e) => {
        e.preventDefault();
        let eventUpdated = {
            name: inputTitle.value,
            author: inputAuthor.value,
            description: inputDescription.value,
        };

        updateEvent(eventUpdated, event.id);

    })
}

