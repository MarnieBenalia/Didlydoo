async function getEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}

async function displayEvents() {
    const main = document.querySelector("main");
    let events = await getEvents();
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        const section = document.createElement("section");
        console.log(event)

        const title = document.createElement("h2");
        title.innerText = event.name;
        section.appendChild(title);

        const description = document.createElement("p");
        description.innerText = event.description;
        section.appendChild(description);
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        section.appendChild(nameInput);

        const divDate = document.createElement("div");
        divDate.className = "div-date";
        const divCheckbox = document.createElement("div");
        const divTitle = document.createElement("h3");
        divTitle.innerText = "Name/Date";
        divDate.appendChild(divTitle);
        divCheckbox.className = "div-checkbox";

        for (let i = 0; i < event.dates.length; i++) {
            let date = event.dates[i];
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = date.date;
            divDate.appendChild(dateDisplayed);

            const dateAgree = document.createElement("input");
            dateAgree.setAttribute("type", "checkbox");
            dateAgree.setAttribute("id", "agree");
            const labelAgree = document.createElement("label");
            labelAgree.setAttribute("for", "agree");
            labelAgree.innerText = "Agree"
            divCheckbox.appendChild(dateAgree);
            divCheckbox.appendChild(labelAgree);

            const dateDisagree = document.createElement("input");
            dateDisagree.setAttribute("type", "checkbox");
            dateDisagree.setAttribute("id", "disagree");
            const labelDisagree = document.createElement("label");
            labelDisagree.setAttribute("for", "disagree");
            labelDisagree.innerText = "Disagree";
            divCheckbox.appendChild(dateDisagree);
            divCheckbox.appendChild(labelDisagree);

            section.appendChild(divDate);

            for (let i = 0; i < date.attendees.length; i++) {
                let attendee = date.attendee[i];
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

        }
        section.appendChild(divCheckbox);

        const author = document.createElement("h4")
        author.innerText = `Event created by ${event.author}`;
        section.appendChild(author);
        main.appendChild(section);

    }

}


displayEvents();