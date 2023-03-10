import { createAttendeeForEvent, deleteEvent, fetchEvents } from "./backend.js";
import { editDataEvent } from "./edit-event.js";

const main = document.querySelector("main");

async function displayEvents() {

    //get events from server
    let events = await fetchEvents();

    for (const event of events) {

        //create a section by event
        const section = document.createElement("section");
        main.appendChild(section); //append section to main tag

        //section title
        const title = document.createElement("h2");
        title.innerText = event.name;
        section.appendChild(title);//append title to section

        //section description
        const description = document.createElement("p");
        description.innerText = event.description;
        section.appendChild(description); //append description to section

        // create a div for dates
        const divDates = document.createElement("div");
        divDates.className = "div-dates"
        section.appendChild(divDates); //append div date to section

        //div title
        const divTitle = document.createElement("h3");
        divTitle.innerText = "Name/Date";
        divDates.appendChild(divTitle); //append title to div date

        //create div checkbox
        const divCheckbox = document.createElement("div");
        divCheckbox.className = "div-checkbox";
        section.appendChild(divCheckbox);//append div checkbox to section

        let checkedRadio = []; //empty array for checked radio buttons
        const attendees = new Map(); //attendees map that will contains attendee and availability dates list
        const attendeesByEvent = new Map(); //attendees map by event that contain event and attendees map

        for (const eventDate of event.dates) {
            //create date element for div dates
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = eventDate.date;
            divDates.appendChild(dateDisplayed); //append date element to div dates

            //div checkbox agree
            const yesRadio = document.createElement("input");
            yesRadio.setAttribute("type", "radio");
            yesRadio.setAttribute("name", `${eventDate.date}`);
            divCheckbox.appendChild(yesRadio); //append agree box to div checkbox

            //create label for agree
            const labelYes = document.createElement("label");
            labelYes.textContent = "V";
            divCheckbox.appendChild(labelYes);//append label to checkbox

            //div checkbox disagree
            const noRadio = document.createElement("input");
            noRadio.setAttribute("type", "radio");
            noRadio.setAttribute("name", `${eventDate.date}`);
            divCheckbox.appendChild(noRadio); //append disagree box to div checkbox

            //create label for disagree
            const labelNo = document.createElement("label");
            labelNo.className="labelNo";
            labelNo.textContent = "X";
            divCheckbox.appendChild(labelNo); //append label to checkbox

            //set listener agree checkbox
            yesRadio.addEventListener('change', () => {
                if (yesRadio.checked) {
                    noRadio.checked = false;
                    checkedRadio.push({ date: yesRadio.name, available: true })
                }
            });

            //set listener disagree checkbox
            noRadio.addEventListener('change', () => {
                if (noRadio.checked) {
                    yesRadio.checked = false;
                    checkedRadio.push({ date: yesRadio.name, available: false })
                }
            });

            //iterate throw attendees list and create unique attendee
            for (const attendee of eventDate.attendees) {
                if (!attendees.has(attendee.name)) {
                    attendees.set(attendee.name, { name: attendee.name, dates: [] });
                }

                //get the availability for each attendee, by date
                const attendeeObject = attendees.get(attendee.name);
                attendeeObject.dates.push({ date: eventDate.date, available: attendee.available });
            }
        }

        //convert attendees list array to a map by event
        attendeesByEvent.set(event.name, Array.from(attendees.values()));

        //create submit button for new attendee
        const submitButton = document.createElement("button");
        submitButton.className = "submit-attendee";
        submitButton.innerText = "Submit";

        //set listener for submit button
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();

            //create object
            let attendee = {
                name: nameInput.value,
                dates: checkedRadio //list of checked and unchecked radio buttons
            }

            //send object to backend (imported function)
            createAttendeeForEvent(attendee, event.id);
        });

        displayAttendeeByEvent(attendeesByEvent, section); //display attendee list by event in section
        //create input name for new attendee
        const nameInput = document.createElement("input");
        nameInput.className="inputName";
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "ENTER YOUR NAME");
        section.appendChild(divCheckbox); //append div checkbox to section(before the author)
        let divInputSubmit = document.createElement("div");
        divInputSubmit.className = "div-inputsubmit";
        divInputSubmit.appendChild(nameInput); //append input to div that contains checkboxes
        divInputSubmit.appendChild(submitButton); //append button to div checkbox
        section.appendChild(divInputSubmit);

        //create div for author edit and trash
        const divAuthor = document.createElement("div");
        divAuthor.className = "div-author";
        section.appendChild(divAuthor); //append div author to section

        //create author
        const author = document.createElement("h4")
        author.innerText = `Event created by ${event.author}`;
        divAuthor.appendChild(author); //append author to section

        //create trash icon
        const trash = document.createElement("i");
        trash.className = "fa-solid fa-trash";
        divAuthor.appendChild(trash);
        trash.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(event)
            deleteEvent(event.id);
        });


        //create edit icon
        const editButton = document.createElement("i");
        editButton.className = "fa-solid fa-pen-to-square";
        divAuthor.appendChild(editButton);
        editButton.addEventListener("click", (e) => {
            e.preventDefault();
            editDataEvent(event);
        });
    }
}

function displayAttendeeByEvent(attendeesByEvent, section) {
    //iterate throw events
    attendeesByEvent.forEach(attendeeList => {
        //iterate throw attendees
        attendeeList.forEach(attendee => {
            //create a div by attendee
            const divAttendee = document.createElement("div");
            divAttendee.className = "div-attendees"
            section.appendChild(divAttendee); //append the div to section

            //create attendee name
            const attendeeDisplayed = document.createElement("h3");
            attendeeDisplayed.innerText = attendee.name;
            divAttendee.appendChild(attendeeDisplayed); //append attendee name to div

            // iterate throw date list
            attendee["dates"].forEach(date => {
                //create availability status
                const dateDisplayed = document.createElement("h3");

                //display the availability status by condition
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

                //append availability to div for each event date
                divAttendee.appendChild(dateDisplayed);
            })
        })
    });
}

//execute main function
displayEvents(); 