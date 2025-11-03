package net.javaguides.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "start_datetime", nullable = false)
    private Instant startDateTime;

    @Column(name = "end_datetime", nullable = false)
    private Instant endDateTime;

    private String location;
}
