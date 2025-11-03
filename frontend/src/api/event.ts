// src/api/eventApi.ts

import {CreateInputEvent, Event} from "../model/event";

const BASE_URL = "http://localhost:8080/api/events";

export const getEventById = async (id: number): Promise<Event> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event");
    return res.json();
};

export const updateEvent = async (event: Event): Promise<Event> => {
    const res = await fetch(`${BASE_URL}/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Failed to update event");
    return res.json();
};

export const createEvent = async (event: CreateInputEvent): Promise<Event> => {
    const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Failed to update event");
    return res.json();
};

export const deleteEvent = async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete event");
};
