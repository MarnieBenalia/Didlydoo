const main = document.querySelector("main");

async function fetchEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events"
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




        for (const date of event.dates) {
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = date.date;
            divDates.appendChild(dateDisplayed);


            for (const attendee of date.attendees) {
                if (!attendees.has(attendee.name)) {
                    attendees.set(attendee.name, { name: attendee.name, dates: [] });
                }
                const attendeeObject = attendees.get(attendee.name);
                attendeeObject.dates.push({ date: date.date, available: attendee.available });
            }
        }
        attendeesByEvent.set(event.name, Array.from(attendees.values()));
        displayAttendeeByEvent(attendeesByEvent, section);

    }

}


/* function createAttendeesByEvent(event) {
    let attendees = {};
    for (let i = 0; i < event.dates.length; i++) {
        let date = event.dates[i];
        for (let i = 0; i < date.attendees.length; i++) {
            let attendee = date.attendees[i];

            if (!attendees[attendee.name]) {
                attendees[attendee.name] = {};
            }

            attendees[attendee.name][date.date] = attendee.available;
            attendees[attendee.name]["name"] = attendee.name;
        };
    };

    return [event.dates, attendees];
} */

function displayAttendeeByEvent(attendeesByEvent, section) {

    attendeesByEvent.forEach(event => {

        console.log(event);
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