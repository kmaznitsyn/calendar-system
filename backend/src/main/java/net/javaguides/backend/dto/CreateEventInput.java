package net.javaguides.backend.dto;

import jakarta.annotation.Nullable;

import java.time.Instant;

public record CreateEventInput(String title, @Nullable String description, Instant startDateTime, Instant endDateTime,
                               @Nullable String location) {
}
