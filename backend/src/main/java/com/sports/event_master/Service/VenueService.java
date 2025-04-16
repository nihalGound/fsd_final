package com.sports.event_master.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sports.event_master.DTO.VenueBookingDTO;
import com.sports.event_master.DTO.VenueDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Entity.Venue;
import com.sports.event_master.Entity.VenueBooking;
import com.sports.event_master.Mapper.VenueMapper;
import com.sports.event_master.Repository.EventRepository;
import com.sports.event_master.Repository.VenueBookingRepository;
import com.sports.event_master.Repository.VenueRepository;

@Service
@Transactional
public class VenueService {

    private final VenueRepository venueRepository;
    private final VenueBookingRepository venueBookingRepository;
    private final EventRepository eventRepository;
    private final VenueMapper venueMapper;

    public VenueService(VenueRepository venueRepository, VenueBookingRepository venueBookingRepository,
                        EventRepository eventRepository, VenueMapper venueMapper) {
        this.venueRepository = venueRepository;
        this.venueBookingRepository = venueBookingRepository;
        this.eventRepository = eventRepository;
        this.venueMapper = venueMapper;
    }

    // Create a new venue
    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    // Update an existing venue
    public Venue updateVenue(Long venueId, Venue venueDetails) {
        Optional<Venue> venueOptional = venueRepository.findById(venueId);
        if (venueOptional.isPresent()) {
            Venue venue = venueOptional.get();
            venue.setVenueName(venueDetails.getVenueName());
            venue.setVenueType(venueDetails.getVenueType());
            venue.setSeatingArea(venueDetails.getSeatingArea());
            venue.setVenueIncharge(venueDetails.getVenueIncharge());
            venue.setVenueFacility(venueDetails.getVenueFacility());
            return venueRepository.save(venue);
        } else {
            throw new RuntimeException("Venue not found with id: " + venueId);
        }
    }

    // Get venue availability on a specific date
    public List<VenueDTO> getVenueAvailabilityOnDate(LocalDate date) {
        List<VenueBooking> venueBookings = venueBookingRepository.findByBookingDate(date);
        
        // Extract venue IDs that are already booked on the given date
        List<Long> bookedVenueIds = venueBookings.stream()
                .map(venueBooking -> venueBooking.getVenue().getVenueId())
                .toList();
            List<Venue> availableVenues;

            if (bookedVenueIds.isEmpty()) {
                    // If no venues are booked, fetch all venues
                availableVenues = venueRepository.findAll();
            } else {
                    // Otherwise, fetch venues not in the booked list
                availableVenues = venueRepository.findByVenueIdNotIn(bookedVenueIds);
            }
        return venueMapper.toDtoList(availableVenues);
    }

    // Book a venue for a specific event
    public VenueBookingDTO bookVenueForEvent(Long venueId, Long eventId, LocalDate bookingDate) {
        Optional<Venue> venueOptional = venueRepository.findById(venueId);
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        if (venueOptional.isPresent() && eventOptional.isPresent()) {
            Venue venue = venueOptional.get();
            Event event = eventOptional.get();

            // Create a new venue booking
            VenueBooking venueBooking = new VenueBooking();
            venueBooking.setVenue(venue);
            venueBooking.setEvent(event);
            venueBooking.setBookingDate(bookingDate);

            // Save the venue booking
            VenueBooking savedBooking = venueBookingRepository.save(venueBooking);

            // Here, we don't update the venueBooked status on the event. We just associate the booking.
            event.setVenueBooked(savedBooking); // Set the booking reference to the event
            eventRepository.save(event); // Save the event with the updated bookingVenue

            return venueMapper.toBookingDto(savedBooking);
        } else {
            throw new RuntimeException("Venue or Event not found");
        }
    }

    // Get all venues
    public List<VenueDTO> getAllVenues() {
        List<Venue> venues = venueRepository.findAll();
        return venueMapper.toDtoList(venues);
    }

    // Get venue by ID
    public VenueDTO getVenueById(Long venueId) {
        Optional<Venue> venueOptional = venueRepository.findById(venueId);
        if (venueOptional.isPresent()) {
            return venueMapper.toDto(venueOptional.get());
        } else {
            throw new RuntimeException("Venue not found with id: " + venueId);
        }
    }

    // Get all venue bookings for a specific event
    public List<VenueBookingDTO> getVenueBookingsForEvent(Long eventId) {
        List<VenueBooking> venueBookings = venueBookingRepository.findByEventId(eventId);
        return venueMapper.toBookingDtoList(venueBookings);
    }

    //get all venue booking for a venue
    public List<VenueBookingDTO> getVenueBookingForVenue(Long venueId) {
        List<VenueBooking> venueBookings = venueBookingRepository.findByVenue_VenueId(venueId);
        return venueMapper.toBookingDtoList(venueBookings);
    }

    public List<VenueDTO> getVenuesByUserId(Long userId) {
        List<Venue> venues = venueRepository.findByUserId(userId);
        return  venueMapper.toDtoList(venues);
    }
}
