export async function fetchEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}


export function createEvent(newEvent) {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
    })/* .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        }) */
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function createAttendeeForEvent(attendee, eventId) {
    const BACKEND_URL = `http://localhost:3000/api/events/${eventId}/attend`
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendee)
    })/* .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        }) */
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function updateEvent(event, id) {
    const BACKEND_URL = `http://localhost:3000/api/events/${id}/`
    console.log(BACKEND_URL);
    fetch(BACKEND_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
    }).catch((error) => {
        console.error('Error:', error);
    });
}


