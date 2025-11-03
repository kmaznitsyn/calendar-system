// src/pages/EventDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    Stack,
    Divider,
} from "@mui/material";
import { getEventById, updateEvent, deleteEvent } from "../api/event";
import {Event} from "../model/event";
import {toast, Toaster} from "react-hot-toast";

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [event, setEvent] = useState<Event | null>(null);
    const [editMode, setEditMode] = useState(false);

    const { control, handleSubmit, reset } = useForm<Event>();

    useEffect(() => {
        if (!id) return;
        getEventById(Number(id))
            .then((data) => {
                // Normalize datetime for input fields
                const normalized = {
                    ...data,
                    startDateTime: data.startDateTime
                        ? new Date(data.startDateTime).toISOString().slice(0, 16)
                        : "",
                    endDateTime: data.endDateTime
                        ? new Date(data.endDateTime).toISOString().slice(0, 16)
                        : "",
                };
                setEvent(normalized);
                reset(normalized);
            })
            .catch((err) => console.error(err));
    }, [id, reset]);

    const onSubmit = async (data: Event) => {
        try {
            const updated = await updateEvent({
                ...data,
                startDateTime: new Date(data.startDateTime).toISOString(),
                endDateTime: new Date(data.endDateTime).toISOString(),
            });
            setEvent(updated);
            setEditMode(false);
            toast.success("Event updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update event");
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteEvent(Number(id));
            navigate("/");
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    const handleCancelEdit = () => {
        reset(event!);
        setEditMode(false);
    };

    if (!event) return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;

    return (
        <>
            <Toaster position="top-right" />
            <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5">
                            {editMode ? "Edit Event" : "Event Details"}
                        </Typography>
                        <Button onClick={() => navigate(-1)}>Back</Button>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    {editMode ? (
                        // ---------- Edit Mode ----------
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Title" fullWidth required />
                                    )}
                                />
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={3}
                                        />
                                    )}
                                />
                                <Controller
                                    name="startDateTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Start Date & Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endDateTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="End Date & Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Location" fullWidth />
                                    )}
                                />

                                <Stack direction="row" spacing={2} mt={2}>
                                    <Button type="submit" variant="contained">
                                        Save
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    ) : (
                        // ---------- Show Mode ----------
                        <Stack spacing={2}>
                            <Typography>
                                <strong>Title:</strong> {event.title}
                            </Typography>
                            {event.description && (
                                <Typography>
                                    <strong>Description:</strong> {event.description}
                                </Typography>
                            )}
                            <Typography>
                                <strong>Start:</strong>{" "}
                                {new Date(event.startDateTime).toLocaleString()}
                            </Typography>
                            <Typography>
                                <strong>End:</strong>{" "}
                                {new Date(event.endDateTime).toLocaleString()}
                            </Typography>
                            {event.location && (
                                <Typography>
                                    <strong>Location:</strong> {event.location}
                                </Typography>
                            )}

                            <Stack direction="row" spacing={2} mt={3}>
                                <Button variant="contained" onClick={() => setEditMode(true)}>
                                    Edit
                                </Button>
                                <Button color="error" variant="outlined" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default EventDetailsPage;
