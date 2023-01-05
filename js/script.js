async function getEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}

async function displayEvents() {
    const main = document.querySelector("main");
    let events = await getEvents();
    for (let event of events) {
        const section = document.createElement("section");
        const article = document.createElement("article");
        console.log(event)

        const title = document.createElement("h2");
        title.innerText = event.name;
        section.appendChild(title);

        const description = document.createElement("p");
        description.innerText = event.description;
        section.appendChild(description);

        for (let date of event.dates) {
            const dateDisplayed = document.createElement("h3");
            dateDisplayed.innerText = date.date;

            article.appendChild(dateDisplayed);

            const dateAgree = document.createElement("input");
            dateAgree.setAttribute("type", "checkbox");
            dateAgree.setAttribute("name", "agree");
            const labelAgree = document.createElement("label");
            labelAgree.setAttribute("for", "agree");

            const dateDisagree = document.createElement("input");
            dateDisagree.setAttribute("type", "checkbox");
            dateDisagree.setAttribute("name", "disagree");
            const labelDisagree = document.createElement("label");
            labelDisagree.setAttribute("for", "disagree");

            for (let attendee of date.attendees) {
                const attendeeName = document.createElement("h3");
                attendeeName.innerText = attendee.name;
                article.appendChild(attendeeName);
                const availability = document.createElement("h3");
                if (attendee.available === true) {
                    availability.innerText = "v";
                } else {
                    availability.innerText = "x";
                }
                article.appendChild(availability);
            }
        }
        section.appendChild(article);
        main.appendChild(section);
    }
}

displayEvents();