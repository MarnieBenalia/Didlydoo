import { createAttendeeForEvent, fetchEvents } from "./backend.js";
import { editDataEvent } from "./edit-event.js";

const main = document.querySelector("main");

async function displayEvents() {


    let events = await fetchEvents();
    for (const event of events) {
        let checkedRadio = [];
        const attendeesByEvent = new Map();

        const section = document.createElement("section");
        /* section.addEventListener("click", (e) => {
            e.preventDefault();
            editDataEvent(event, "update");
        }) */
        main.appendChild(section);

        //section title
        const title = document.createElement("h2");
        title.innerText = event.name;
        section.appendChild(title);

        //section description
        const description = document.createElement("p");
        description.innerText = event.description;

        section.appendChild(description); //append title and description

        const attendees = new Map();
        const divDates = document.createElement("div");
        divDates.className = "div-dates"
        section.appendChild(divDates);

        //div title
        const divTitle = document.createElement("h3");
        divTitle.innerText = "Name/Date";
        divDates.appendChild(divTitle); //append div title

        //create div checkbox
        const divCheckbox = document.createElement("div");
        divCheckbox.className = "div-checkbox";
        section.appendChild(divCheckbox);

        let date = null;
        for (const eventDate of event.dates) {
            date = eventDate;
            //create date element for div dates
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = eventDate.date;
            divDates.appendChild(dateDisplayed); //append date element to div dates

            //div checkbox agree
            const yesRadio = document.createElement("input");
            yesRadio.setAttribute("type", "radio");
            yesRadio.setAttribute("name", `${eventDate.date}`);
            yesRadio.innerHTML = "V";
            divCheckbox.appendChild(yesRadio); //append agree box to div checkbox


            const labelYes = document.createElement("label");
            labelYes.textContent = "V";
            divCheckbox.appendChild(labelYes);

            //div checkbox disagree
            const noRadio = document.createElement("input");
            noRadio.setAttribute("type", "radio");
            noRadio.setAttribute("name", `${eventDate.date}`);
            noRadio.innerText = "X";
            divCheckbox.appendChild(noRadio); //append disagree box to div checkbox

            const labelNo = document.createElement("label");
            labelNo.textContent = "X";
            divCheckbox.appendChild(labelNo);

            section.appendChild(divDates); //append div dates to section

            yesRadio.addEventListener('change', () => {
                if (yesRadio.checked) {
                    noRadio.checked = false;
                    checkedRadio.push({ date: yesRadio.name, available: true })
                }
            });

            noRadio.addEventListener('change', () => {
                if (noRadio.checked) {
                    yesRadio.checked = false;
                    checkedRadio.push({ date: yesRadio.name, available: false })

                    /*  checkedRadio.filter(function (obj) {
                         return obj.date !== date.date;
                     }); */

                }
            });

            for (const attendee of eventDate.attendees) {
                if (!attendees.has(attendee.name)) {
                    attendees.set(attendee.name, { name: attendee.name, dates: [] });
                }
                const attendeeObject = attendees.get(attendee.name);
                attendeeObject.dates.push({ date: eventDate.date, available: attendee.available });
            }

        }

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        divCheckbox.prepend(nameInput);

        attendeesByEvent.set(event.name, Array.from(attendees.values()));
        section.appendChild(divCheckbox);

        const submitButton = document.createElement("button");
        submitButton.className = "submit-attendee"
        submitButton.innerText = "Submit";
        divCheckbox.appendChild(submitButton);
        submitButton.addEventListener("click", (e) => {

            let attendee = {
                name: nameInput.value,
                dates: checkedRadio
            }
            e.preventDefault();
            console.log(checkedRadio);
            createAttendeeForEvent(attendee, event.id)
        });

        displayAttendeeByEvent(attendeesByEvent, section);
        const author = document.createElement("h4")
        author.innerText = `Event created by ${event.author}`;
        section.appendChild(author);
    }
}

function displayAttendeeByEvent(attendeesByEvent, section) {
    attendeesByEvent.forEach(event => {
        event.forEach(attendee => {
            const divAttendee = document.createElement("div");
            divAttendee.className = "div-attendees"
            section.appendChild(divAttendee);

            const attendeeDisplayed = document.createElement("h3");
            attendeeDisplayed.innerText = attendee.name;
            divAttendee.appendChild(attendeeDisplayed);

            attendee["dates"].forEach(date => {
                const dateDisplayed = document.createElement("h3");
                dateDisplayed.innerText = date.date;
                divAttendee.appendChild(dateDisplayed);
                switch (date.available) {
                    case null:
                        dateDisplayed.innerText = "null";
                        break;

                    case true:
                        dateDisplayed.innerText = "true";
                        break;

                    case false:
                        dateDisplayed.innerText = "false";
                        break;

                }
                divAttendee.appendChild(dateDisplayed)
            })
        })
    });
}

displayEvents();