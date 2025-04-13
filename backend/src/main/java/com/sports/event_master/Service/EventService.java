package com.sports.event_master.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sports.event_master.Entity.Event;
import com.sports.event_master.Entity.Sponsorships;
import com.sports.event_master.Repository.EventRepository;
import com.sports.event_master.Repository.SponsorshipRepository;
import com.sports.event_master.DTO.EventDTO;
import com.sports.event_master.DTO.SponsorshipDTO;
import com.sports.event_master.Mapper.EventMapper;

@Service
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final SponsorshipRepository sponsorshipRepository;
    private final EventMapper eventMapper;

    public EventService(EventRepository eventRepository, SponsorshipRepository sponsorshipRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.sponsorshipRepository = sponsorshipRepository;
        this.eventMapper = eventMapper;
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

    public EventDTO updateVenue(Long eventId, Long newVenue) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setVenue(newVenue);
        Event updatedEvent = eventRepository.save(event);
        return eventMapper.toDto(updatedEvent);
    }
}
