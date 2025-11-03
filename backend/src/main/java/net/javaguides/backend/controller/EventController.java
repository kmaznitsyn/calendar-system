package net.javaguides.backend.controller;

import lombok.RequiredArgsConstructor;
import net.javaguides.backend.dto.CreateEventInput;
import net.javaguides.backend.model.Event;
import net.javaguides.backend.repository.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class EventController {

    private final EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody CreateEventInput newEvent) {
        Event event = new Event();
        event.setTitle(newEvent.title());
        event.setDescription(newEvent.description());
        event.setStartDateTime(newEvent.startDateTime());
        event.setEndDateTime(newEvent.endDateTime());
        event.setLocation(newEvent.location());

        return eventRepository.save(event);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return eventRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedEvent.getTitle());
                    existing.setDescription(updatedEvent.getDescription());
                    existing.setStartDateTime(updatedEvent.getStartDateTime());
                    existing.setEndDateTime(updatedEvent.getEndDateTime());
                    existing.setLocation(updatedEvent.getLocation());
                    return ResponseEntity.ok(eventRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
