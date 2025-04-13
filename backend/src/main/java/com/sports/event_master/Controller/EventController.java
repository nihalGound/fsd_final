package com.sports.event_master.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sports.event_master.DTO.EventDTO;
import com.sports.event_master.DTO.SponsorshipDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Service.EventService;

@RestController
@RequestMapping("/api/events")
// @CrossOrigin(origins="http://localhost:4200")
public class EventController {

    private final EventService eventService;
    
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventDTO>> getEventsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(eventService.getEventByUserId(userId));
    }
    
    @GetMapping("/{eventId}/sponsorships")
    public ResponseEntity<List<SponsorshipDTO>> getEventSponsorships(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.getEventSponsorshipRequests(eventId));
    }
    
    @PutMapping("/sponsorships/{sponsorshipId}/accept")
    public ResponseEntity<SponsorshipDTO> acceptSponsorship(@PathVariable Long sponsorshipId) {
        return ResponseEntity.ok(eventService.acceptSponsorship(sponsorshipId));
    }
    
    @PutMapping("/{eventId}/venue")
    public ResponseEntity<EventDTO> updateVenue(
            @PathVariable Long eventId,
            @RequestBody Long venueId) {
        return ResponseEntity.ok(eventService.updateVenue(eventId, venueId));
    }
}