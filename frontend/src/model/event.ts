// src/types/Event.ts
export interface Event {
    id: number;
    title: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    location?: string;
}

export type CreateInputEvent = {
    title: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    location?: string;
}