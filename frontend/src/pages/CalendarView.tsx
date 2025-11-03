import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Event } from "../model/event";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export const CalendarView: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<Event[]>("http://localhost:8080/api/events").then((res) => {
            const calendarEvents = res.data.map((event) => ({
                id: event.id.toString(),
                title: event.title,
                start: event.startDateTime,
                end: event.endDateTime,
            }));
            setEvents(calendarEvents);
        });
    }, []);

    const handleEventClick = (info: any) => {
        navigate(`/events/${info.event.id}`); // Navigate to Event Details Page
    };

    return (
        <Box
            sx={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: 3,
                backgroundColor: "#fff",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Event Calendar
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/events/new")}
                >
                    Add New Event
                </Button>
            </Box>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto" // prevents taking full viewport height
                events={events}
                eventClick={handleEventClick}
            />
        </Box>
    );
};
