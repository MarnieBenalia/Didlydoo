const inputTitle = document.querySelector(".input-title");
const inputAuthor = document.querySelector(".input-author");
const inputDescription = document.querySelector(".input-description");
const inputDateList = document.querySelectorAll(".input-date");
const buttonSubmit = document.querySelector(".button-submit");
const aside = document.querySelector("aside");

buttonSubmit.addEventListener("click", () => {
    let id = Math.random().toString(24).slice(2)
    console.log(id);

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
    console.log(newEvent);

    createEvent(newEvent);

});


function createEvent(newEvent) {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
    }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
