package com.sports.event_master.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sports.event_master.DTO.EventDTO;
import com.sports.event_master.DTO.SponsorshipDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Entity.Sponsorships;
import com.sports.event_master.Entity.Venue;
import com.sports.event_master.Entity.VenueBooking;
import com.sports.event_master.Mapper.EventMapper;
import com.sports.event_master.Repository.EventRepository;
import com.sports.event_master.Repository.SponsorshipRepository;
import com.sports.event_master.Repository.VenueBookingRepository;
import com.sports.event_master.Repository.VenueRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final SponsorshipRepository sponsorshipRepository;
    private final EventMapper eventMapper;
    private final VenueBookingRepository venueBookingRepository;
    private final VenueRepository venueRepository;

    public EventService(EventRepository eventRepository, SponsorshipRepository sponsorshipRepository, EventMapper eventMapper,VenueBookingRepository venueBookingRepository,VenueRepository venueRepository) {
        this.eventRepository = eventRepository;
        this.sponsorshipRepository = sponsorshipRepository;
        this.eventMapper = eventMapper;
        this.venueBookingRepository = venueBookingRepository;
        this.venueRepository = venueRepository;
    }

    // Event CRUD operations
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return eventMapper.toDtoList(events);
    }

    public EventDTO getEventById(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            return eventMapper.toDto(eventOptional.get());
        } else {
            throw new RuntimeException("Event not found with id: " + id);
        }
    }

    public List<EventDTO> getEventByUserId(Long userId) {
        List<Event> events = eventRepository.findByEventHead(userId);
        return eventMapper.toDtoList(events);
    }

    // Sponsorship-related methods
    public List<SponsorshipDTO> getEventSponsorshipRequests(Long eventId) {
        List<Sponsorships> sponsorships = sponsorshipRepository.findByEvent_Id(eventId);
        return eventMapper.toSponsorshipDtoList(sponsorships);
    }

    public SponsorshipDTO acceptSponsorship(Long sponsorshipId) {
        Sponsorships sponsorship = sponsorshipRepository.findById(sponsorshipId)
                .orElseThrow(() -> new RuntimeException("Sponsorship not found"));

        sponsorship.setStatus("ACCEPTED");
        Sponsorships savedSponsorship = sponsorshipRepository.save(sponsorship);
        return eventMapper.toSponsorshipDto(savedSponsorship);
    }
   @Transactional
    public EventDTO updateVenueBooked(Long eventId, Long venueId,String bookingDate) {
        // Fetch Event by ID
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID: " + eventId));

        // Fetch Venue by ID
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new EntityNotFoundException("Venue not found with ID: " + venueId));

        // Fetch current VenueBooking
        VenueBooking currentBooking = event.getVenueBooked();
        if(currentBooking==null){
            currentBooking = new VenueBooking();
            currentBooking.setEvent(event);
            currentBooking.setBookingDate(LocalDate.parse(bookingDate));
        }

        currentBooking.setVenue(venue);

        venueBookingRepository.save(currentBooking);

        // Update Event and save
        event.setVenueBooked(currentBooking);
        eventRepository.save(event);

        // Convert to DTO and return
        return eventMapper.toDto(event);
    }

    @Transactional
    public String deleteEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new EntityNotFoundException("Event with ID " + eventId + " not found"));
    
        if (event.getVenueBooked() != null) {
            venueBookingRepository.deleteById(event.getVenueBooked().getBookingId());
        }

        List<Sponsorships> sponsorships = sponsorshipRepository.findByEvent_Id(event.getEventId());
        for (Sponsorships sponsorship : sponsorships) {
            sponsorshipRepository.deleteById(sponsorship.getId());
        }
    
        eventRepository.deleteById(event.getEventId());
    
        return "Event with ID " + eventId + " and associated venue booking (if any) have been deleted successfully.";
    }
}
