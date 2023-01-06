const main = document.querySelector("main");

async function displayEvents() {
    let events = await fetchEvents();
    let eventToDisplay = null;
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        console.log(event)
        eventToDisplay = createSectionByEvent(event);
        main.appendChild(eventToDisplay);
    }
}

async function fetchEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}


function createSectionByEvent(event) {
    //create section
    const section = document.createElement("section");

    //section title
    const title = document.createElement("h2");
    title.innerText = event.name;
    section.appendChild(title);

    //section description
    const description = document.createElement("p");
    description.innerText = event.description;

    section.appendChild(description); //append title and description

    //create div dates
    const divDates = document.createElement("div");
    divDates.className = "div-date";

    //div title
    const divTitle = document.createElement("h3");
    divTitle.innerText = "Name/Date";
    divDates.appendChild(divTitle); //append div title

    //create div checkbox
    const divCheckbox = document.createElement("div");
    divCheckbox.className = "div-checkbox";

    createDates(event, divDates, divCheckbox, section);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    section.appendChild(nameInput);
    section.appendChild(divCheckbox);

    const author = document.createElement("h4")
    author.innerText = `Event created by ${event.author}`;
    section.appendChild(author);

    return section;
}


function createDates(event, divDates, divCheckbox, section) {
    for (let i = 0; i < event.dates.length; i++) {
        let date = event.dates[i];

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

        createAttendees(date, section);
    }
}

function createAttendees(date, section) {
    for (let i = 0; i < date.attendees.length; i++) {
        let attendee = date.attendees[i];
        const attendeeName = document.createElement("h3");
        const divByName = document.createElement("div");
        divByName.className = "div-name";
        attendeeName.innerText = attendee.name;
        divByName.appendChild(attendeeName);

        const availability = document.createElement("h3");
        if (attendee.available === true) {
            availability.innerText = "v";
        } else {
            availability.innerText = "x";
        }
        divByName.appendChild(availability);
        section.appendChild(divByName);
    }

    //return attendee object
}

displayEvents();