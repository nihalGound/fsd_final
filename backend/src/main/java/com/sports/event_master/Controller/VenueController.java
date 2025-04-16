package com.sports.event_master.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sports.event_master.DTO.VenueBookingDTO;
import com.sports.event_master.DTO.VenueDTO;
import com.sports.event_master.Entity.Venue;
import com.sports.event_master.Service.VenueService;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    // Create a new venue
    @PostMapping
    public ResponseEntity<Venue> createVenue(@RequestBody VenueDTO venueDTO) {
        Venue venue = new Venue();
        venue.setVenueName(venueDTO.getVenueName());
        venue.setVenueType(venueDTO.getVenueType());
        venue.setSeatingArea(venueDTO.getSeatingArea());
        venue.setVenueIncharge(venueDTO.getVenueIncharge());
        venue.setVenueFacility(venueDTO.getVenueFacility());
        
        Venue createdVenue = venueService.createVenue(venue);
        
        return new ResponseEntity<>(createdVenue, HttpStatus.CREATED);
    }

    // Update an existing venue
    @PutMapping("/{venueId}")
    public ResponseEntity<Venue> updateVenue(@PathVariable Long venueId, @RequestBody VenueDTO venueDTO) {
        Venue venue = new Venue();
        venue.setVenueName(venueDTO.getVenueName());
        venue.setVenueType(venueDTO.getVenueType());
        venue.setSeatingArea(venueDTO.getSeatingArea());
        venue.setVenueIncharge(venueDTO.getVenueIncharge());
        venue.setVenueFacility(venueDTO.getVenueFacility());
        
        Venue updatedVenue = venueService.updateVenue(venueId, venue);
        
        return new ResponseEntity<>(updatedVenue, HttpStatus.OK);
    }

    // Get all venues
    @GetMapping
    public ResponseEntity<List<VenueDTO>> getAllVenues() {
        List<VenueDTO> venueList = venueService.getAllVenues();
        return new ResponseEntity<>(venueList, HttpStatus.OK);
    }

    // Get venue by ID
    @GetMapping("/{venueId}")
    public ResponseEntity<VenueDTO> getVenueById(@PathVariable Long venueId) {
        VenueDTO venueDTO = venueService.getVenueById(venueId);
        return new ResponseEntity<>(venueDTO, HttpStatus.OK);
    }

    // Check venue availability on a specific date
    @GetMapping("/availability")
    public ResponseEntity<List<VenueDTO>> getVenueAvailability(@RequestParam("date") String date) {
        try {
            LocalDate parsedDate = LocalDate.parse(date); 
            List<VenueDTO> availableVenues = venueService.getVenueAvailabilityOnDate(parsedDate);
            return new ResponseEntity<>(availableVenues, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Book a venue for a specific event
    @PostMapping("/book")
    public ResponseEntity<VenueBookingDTO> bookVenueForEvent(@RequestParam Long venueId, @RequestParam Long eventId, 
                                                             @RequestParam String bookingDate) {
        try {
            LocalDate parsedDate = LocalDate.parse(bookingDate);
            VenueBookingDTO bookingDTO = venueService.bookVenueForEvent(venueId, eventId, parsedDate);
            return new ResponseEntity<>(bookingDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Get all venue bookings for a specific event
    @GetMapping("/event/{eventId}/bookings")
    public ResponseEntity<List<VenueBookingDTO>> getVenueBookingsForEvent(@PathVariable Long eventId) {
        List<VenueBookingDTO> bookings = venueService.getVenueBookingsForEvent(eventId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Get all venue bookings for a specific venue
    @GetMapping("/venue/{venueId}/bookings")
    public ResponseEntity<List<VenueBookingDTO>> getVenueBookingsForVenue(@PathVariable Long venueId) {
        List<VenueBookingDTO> bookings = venueService.getVenueBookingForVenue(venueId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/venue")
    public ResponseEntity<List<VenueDTO>> getVenuesByUserId(@RequestParam Long userId) {
        List<VenueDTO> venues = venueService.getVenuesByUserId(userId);
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }
    
}