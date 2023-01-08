//GET list of all events
export async function fetchEvents() {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    const request = await fetch(BACKEND_URL);
    const response = await request.json();
    return response;
}

//POST new event
export function createEvent(newEvent) {
    const BACKEND_URL = "http://localhost:3000/api/events/"
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

//POST new attendee for event
export function createAttendeeForEvent(attendee, eventId) {
    const BACKEND_URL = `http://localhost:3000/api/events/${eventId}/attend`
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendee)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

//PATCH event basic infos
export function updateEvent(event, id) {
    const BACKEND_URL = `http://localhost:3000/api/events/${id}/`
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