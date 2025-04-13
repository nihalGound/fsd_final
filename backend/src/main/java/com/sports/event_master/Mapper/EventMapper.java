package com.sports.event_master.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.sports.event_master.DTO.EventDTO;
import com.sports.event_master.DTO.SponsorDTO;
import com.sports.event_master.DTO.SponsorshipDTO;
import com.sports.event_master.Entity.Event;
import com.sports.event_master.Entity.Sponsor;
import com.sports.event_master.Entity.Sponsorships;

@Component
public class EventMapper {

    public EventDTO toDto(Event event) {
        EventDTO dto = new EventDTO();
        dto.setEventId(event.getEventId());
        dto.setEventName(event.getEventName());
        dto.setEventType(event.getEventType());
        dto.setEventHead(event.getEventHead());
        dto.setEventDay(event.getEventDay());
        dto.setVenue(event.getVenue());
        
        if (event.getSponsorships() != null) {
            dto.setSponsorships(toSponsorshipDtoList(event.getSponsorships()));
        }
        
        return dto;
    }
    
    public List<EventDTO> toDtoList(List<Event> events) {
        return events.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    public SponsorshipDTO toSponsorshipDto(Sponsorships sponsorship) {
        SponsorshipDTO dto = new SponsorshipDTO();
        dto.setId(sponsorship.getId());
        dto.setContributionAmount(sponsorship.getContributionAmount());
        dto.setStatus(sponsorship.getStatus());
        dto.setRequestDate(sponsorship.getRequestDate());
        
        if (sponsorship.getSponsor() != null) {
            dto.setSponsor(toSponsorDto(sponsorship.getSponsor()));
        }
        
        return dto;
    }
    
    public List<SponsorshipDTO> toSponsorshipDtoList(List<Sponsorships> sponsorships) {
        return sponsorships.stream()
                .map(this::toSponsorshipDto)
                .collect(Collectors.toList());
    }
    
    public SponsorDTO toSponsorDto(Sponsor sponsor) {
        SponsorDTO dto = new SponsorDTO();
        dto.setId(sponsor.getId());
        dto.setName(sponsor.getName());
        dto.setRegistrationDate(sponsor.getRegistrationDate());
        return dto;
    }
}