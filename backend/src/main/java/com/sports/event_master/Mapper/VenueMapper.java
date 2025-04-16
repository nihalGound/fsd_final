package com.sports.event_master.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.sports.event_master.DTO.VenueBookingDTO;
import com.sports.event_master.DTO.VenueDTO;
import com.sports.event_master.Entity.Venue;
import com.sports.event_master.Entity.VenueBooking;

@Component
public class VenueMapper {

    public VenueDTO toDto(Venue venue) {
        VenueDTO venueDTO = new VenueDTO();
        venueDTO.setVenueId(venue.getVenueId());
        venueDTO.setVenueName(venue.getVenueName());
        venueDTO.setSeatingArea(venue.getSeatingArea());
        venueDTO.setVenueFacility(venue.getVenueFacility());
        venueDTO.setVenueId(venue.getVenueId());
        venueDTO.setVenueIncharge(venue.getVenueIncharge());
        venueDTO.setUserId(venue.getUserId());
        return venueDTO;
    }
    public List<VenueDTO> toDtoList(List<Venue> venues) {
        return venues.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public VenueBookingDTO toBookingDto(VenueBooking venueBooking) {
        VenueBookingDTO venueBookingDTO = new VenueBookingDTO();
        venueBookingDTO.setBookingId(venueBooking.getBookingId());
        VenueDTO venueDTO = toDto(venueBooking.getVenue());
        venueBookingDTO.setVenue(venueDTO); 
        venueBookingDTO.setBookingDate(venueBooking.getBookingDate());
        return venueBookingDTO;
    }

    public List<VenueBookingDTO> toBookingDtoList(List<VenueBooking> venueBookings) {
        return venueBookings.stream()
                .map(this::toBookingDto)
                .collect(Collectors.toList());
    }

    public VenueBookingDTO toVenueBookingDTO(VenueBooking venueBooking) {
    if (venueBooking == null) {
        return null;
    }

    VenueBookingDTO dto = new VenueBookingDTO();
    dto.setBookingId(venueBooking.getBookingId());
    dto.setBookingDate(venueBooking.getBookingDate());
    VenueDTO venueDTO = new VenueDTO();
    Venue venue = venueBooking.getVenue();
    if (venue != null) {
        venueDTO.setVenueId(venue.getVenueId());
        venueDTO.setVenueName(venue.getVenueName());
    }
    dto.setVenue(venueDTO);

    return dto;
    }
}
