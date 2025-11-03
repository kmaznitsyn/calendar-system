import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import { Toaster, toast } from "react-hot-toast";

type EventFormInputs = {
    title: string;
    description?: string;
    dateRange: {
        start: Dayjs | null;
        end: Dayjs | null;
    };
    location?: string;
};

export const AddEventPage = () => {
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EventFormInputs>({
        defaultValues: {
            title: "",
            description: "",
            dateRange: {
                start: dayjs(),
                end: dayjs().add(1, "hour"),
            },
            location: "",
        },
    });

    const onSubmit = async (data: EventFormInputs) => {
        try {
            await createEvent({
                ...data,
                startDateTime: data.dateRange.start?.toISOString()!,
                endDateTime: data.dateRange.end?.toISOString()!,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create event. Please try again.");
        }
    };

    const start = watch("dateRange.start");
    const end = watch("dateRange.end");

    return (
        <>
            <Toaster position="top-right" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{ maxWidth: 500, m: "auto", mt: 4 }}>
                    <Typography variant="h5">Add New Event</Typography>

                    {/* Title */}
                    <TextField
                        label="Title"
                        {...register("title", {
                            required: "Title is required",
                            maxLength: {
                                value: 255,
                                message: "Title must be under 255 characters",
                            },
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />

                    {/* Description */}
                    <TextField label="Description" {...register("description")} multiline />

                    {/* Start Date */}
                    <Controller
                        name="dateRange.start"
                        control={control}
                        rules={{
                            required: "Start date is required",
                        }}
                        render={({ field }) => (
                            <DateTimePicker
                                label="Start Date & Time"
                                value={field.value}
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                    if (newValue && end && newValue.isAfter(end)) {
                                        setValue("dateRange.end", newValue.add(1, "hour"));
                                    }
                                }}
                                slotProps={{
                                    textField: {
                                        error: !!errors.dateRange?.start,
                                        helperText: errors.dateRange?.start?.message,
                                    },
                                }}
                            />
                        )}
                    />

                    {/* End Date */}
                    <Controller
                        name="dateRange.end"
                        control={control}
                        rules={{
                            required: "End date is required",
                            validate: (value) => {
                                const startValue = watch("dateRange.start");
                                if (!startValue) return "Start date must be set first";
                                if (value && startValue && value.isBefore(startValue)) {
                                    return "End date must be after start date";
                                }
                                return true;
                            },
                        }}
                        render={({ field }) => (
                            <DateTimePicker
                                label="End Date & Time"
                                value={field.value}
                                minDateTime={start || undefined}
                                onChange={field.onChange}
                                slotProps={{
                                    textField: {
                                        error: !!errors.dateRange?.end,
                                        helperText: errors.dateRange?.end?.message,
                                    },
                                }}
                            />
                        )}
                    />

                    {/* Location */}
                    <TextField
                        label="Location"
                        {...register("location", {
                            maxLength: {
                                value: 255,
                                message: "Location must be under 255 characters",
                            },
                        })}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                    />

                    {/* Error Summary */}
                    {Object.keys(errors).length > 0 && (
                        <Typography color="error" variant="body2">
                            Please fix the errors above before submitting.
                        </Typography>
                    )}

                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                        Add Event
                    </Button>
                </Stack>
            </LocalizationProvider>
        </>
    );
};
