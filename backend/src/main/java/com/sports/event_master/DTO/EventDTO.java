package com.sports.event_master.DTO;

import java.time.LocalDate;
import java.util.List;

import com.sports.event_master.Entity.VenueBooking;

public class EventDTO {
    private Long eventId;
    private String eventType;
    private String eventName;
    private Long eventHead;
    private LocalDate eventDay;
    private VenueBooking venueBooked;
    private List<SponsorshipDTO> sponsorships;
    
    // Getters and setters
    public Long getEventId() {
        return eventId;
    }
    
    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
    
    public String getEventType() {
        return eventType;
    }
    
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    
    public String getEventName() {
        return eventName;
    }
    
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
    
    public Long getEventHead() {
        return eventHead;
    }
    
    public void setEventHead(Long eventHead) {
        this.eventHead = eventHead;
    }
    
    public LocalDate getEventDay() {
        return eventDay;
    }
    
    public void setEventDay(LocalDate eventDay) {
        this.eventDay = eventDay;
    }
    
    public List<SponsorshipDTO> getSponsorships() {
        return sponsorships;
    }
    
    public void setSponsorships(List<SponsorshipDTO> sponsorships) {
        this.sponsorships = sponsorships;
    }

    public VenueBooking getVenueBooked() {
        return venueBooked;
    }

    public void setVenueBooked(VenueBooking venueBooked) {
        this.venueBooked = venueBooked;
    }
}