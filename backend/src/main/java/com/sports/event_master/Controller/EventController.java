package com.sports.event_master.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sports.event_master.Entity.TypeEvent;
import com.sports.event_master.Repository.EventRepository;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins="http://localhost:4200")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Testing event API");
    }

    @GetMapping
    public ResponseEntity<List<TypeEvent>> getAllEvents() {
        List<TypeEvent> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeEvent> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/create")
    public ResponseEntity<TypeEvent> createEvent(@RequestBody TypeEvent event) {
        TypeEvent createdEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeEvent(@PathVariable Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return ResponseEntity.ok("Event " + id + " deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event " + id + " not found");
        }
    }

    @PutMapping("/{id}/changeVenue")
    public ResponseEntity<String> changeVenue(@PathVariable Long id, @RequestBody Long venue) {
        Optional<TypeEvent> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            TypeEvent event = existingEvent.get();
            event.setVenue(venue);
            eventRepository.save(event);
            return ResponseEntity.ok("Venue updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
        }
    }



    @PutMapping("/{id}/changeSponsor")
    public ResponseEntity<String> changeSponsor(@PathVariable Long id, @RequestBody Long sponsor) {
        Optional<TypeEvent> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            TypeEvent event = existingEvent.get();
            event.setSponsor(sponsor);
            eventRepository.save(event);
            return ResponseEntity.ok("Sponsor updated successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
    }

    @PutMapping("/{id}/setResult")
    public ResponseEntity<String> setEventResult(@PathVariable Long id, @RequestBody Long result) {
        Optional<TypeEvent> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            TypeEvent event = existingEvent.get();
            event.setResult(result);
            eventRepository.save(event);
            return ResponseEntity.ok("Result updated successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
    }
}
