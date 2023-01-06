const main = document.querySelector("main");

async function fetchEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}

async function displayEvents() {

    let events = await fetchEvents();
    const attendeesByEvent = new Map();
    for (const event of events) {
        const section = document.createElement("section");
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

        for (const date of event.dates) {

            //create date element for div dates
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = date.date;
            divDates.appendChild(dateDisplayed); //append date element to div dates

            //div checkbox agree
            const dateAgree = document.createElement("input");
            dateAgree.setAttribute("type", "checkbox");
            dateAgree.setAttribute("id", "agree");
            const labelAgree = document.createElement("label");
            labelAgree.setAttribute("for", "agree");
            labelAgree.innerText = "Agree";
            divCheckbox.appendChild(dateAgree); //append agree box to div checkbox
            divCheckbox.appendChild(labelAgree); //append label to div checkbox

            //div checkbox disagree
            const dateDisagree = document.createElement("input");
            dateDisagree.setAttribute("type", "checkbox");
            dateDisagree.setAttribute("id", "disagree");
            const labelDisagree = document.createElement("label");
            labelDisagree.setAttribute("for", "disagree");
            labelDisagree.innerText = "Disagree";
            divCheckbox.appendChild(dateDisagree); //append disagree box to div checkbox
            divCheckbox.appendChild(labelDisagree); //append label to div checkbox

            section.appendChild(divDates); //append div dates to section

            for (const attendee of date.attendees) {
                if (!attendees.has(attendee.name)) {
                    attendees.set(attendee.name, { name: attendee.name, dates: [] });
                }
                const attendeeObject = attendees.get(attendee.name);
                attendeeObject.dates.push({ date: date.date, available: attendee.available });
            }
        }
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        divCheckbox.prepend(nameInput);

        attendeesByEvent.set(event.name, Array.from(attendees.values()));
        displayAttendeeByEvent(attendeesByEvent, section);
        section.appendChild(divCheckbox);

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

//---------------------------------------------------------------------------------------------------------//

const BUTTON = document.querySelector(".buttonadd");
const ASIDE =document.querySelector("aside");

BUTTON.addEventListener('click',() =>{

    ASIDE.style.marginLeft="0%"

})

const BUTTONCLOSE = document.querySelector(".button-close");

BUTTONCLOSE.addEventListener('click',() =>{

    ASIDE.style.marginLeft="-100%"

})