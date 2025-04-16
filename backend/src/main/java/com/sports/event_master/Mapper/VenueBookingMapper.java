package com.sports.event_master.Mapper;

import org.springframework.stereotype.Component;

import com.sports.event_master.DTO.VenueBookingDTO;
import com.sports.event_master.DTO.VenueDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Entity.Venue;
import com.sports.event_master.Entity.VenueBooking;

@Component
public class VenueBookingMapper {

    // Convert VenueBooking Entity to VenueBookingDTO
    public VenueBookingDTO toDto(VenueBooking venueBooking) {
        if (venueBooking == null) {
            return null;
        }

        VenueBookingDTO venueBookingDTO = new VenueBookingDTO();
        venueBookingDTO.setBookingId(venueBooking.getBookingId());
        
        // Convert Venue entity to VenueDTO
        VenueDTO venueDTO = new VenueDTO();
        venueDTO.setVenueId(venueBooking.getVenue().getVenueId());// Assuming Venue has a getVenueId() method
        venueDTO.setVenueName(venueBooking.getVenue().getVenueName());  // Add other fields as necessary
        venueBookingDTO.setVenue(venueDTO);  // Set VenueDTO in VenueBokingDTO
        
        venueBookingDTO.setBookingDate(venueBooking.getBookingDate());

        return venueBookingDTO;
    }

    // Convert VenueBookingDTO to VenueBooking Entity
    public VenueBooking toEntity(VenueBookingDTO venueBookingDTO) {
        if (venueBookingDTO == null) {
            return null;
        }

        VenueBooking venueBooking = new VenueBooking();
        venueBooking.setBookingId(venueBookingDTO.getBookingId());
        
        // Convert VenueDTO back to Venue entity
        Venue venue = new Venue();
        venue.setVenueId(venueBookingDTO.getVenue().getVenueId());  // Assuming you can set the ID directly
        venue.setVenueName(venueBookingDTO.getVenue().getVenueName());  // Set other fields as necessary
        venueBooking.setVenue(venue);
        
        // Assuming you will fetch the Event from the repository using the eventId
        Event event = new Event();
        event.setEventId(venueBookingDTO.getBookingId());  // Replace this with actual event fetching logic
        venueBooking.setEvent(event);

        venueBooking.setBookingDate(venueBookingDTO.getBookingDate());

        return venueBooking;
    }
}