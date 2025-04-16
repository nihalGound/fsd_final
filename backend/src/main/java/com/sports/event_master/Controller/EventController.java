package com.sports.event_master.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sports.event_master.DTO.EventDTO;
import com.sports.event_master.DTO.SponsorshipDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Service.EventService;
import com.sports.event_master.Service.VenueService;

@RestController
@RequestMapping("/api/events")
// @CrossOrigin(origins="http://localhost:4200")
public class EventController {

    private final EventService eventService;
    private final VenueService venueService;
    
    public EventController(EventService eventService,VenueService venueService) {
        this.eventService = eventService;
        this.venueService = venueService;
    }
    
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody Event event, @RequestParam(required = false) Long venueId) {
        // Create the event
        Event createdEvent = eventService.createEvent(event);
    
        // If venueId is provided, create a venue booking
        if (venueId != null) {
            venueService.bookVenueForEvent(venueId, createdEvent.getEventId(), createdEvent.getEventDay());
        }
    
        // Return the created event details
        return new ResponseEntity<>(eventService.getEventById(createdEvent.getEventId()), HttpStatus.CREATED);
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

    @PutMapping("/updateVenueBooking")
    public ResponseEntity<EventDTO> updateVenueBooking(@RequestParam("eventId") Long eventId, @RequestParam("venueId") Long venueId,@RequestParam("bookingDate") String bookingDate) {
        return  ResponseEntity.ok(eventService.updateVenueBooked(eventId, venueId,bookingDate));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>>deleteEvent(@RequestParam("eventId")Long eventId){
        String message = eventService.deleteEventById(eventId);
        Map<String,String>response = new HashMap<>();
        response.put("message", message);
        return  ResponseEntity.ok(response);
    }
}