package com.sports.event_master.DTO;

import java.time.LocalDate;
import java.util.List;

public class EventDTO {
    private Long eventId;
    private String eventType;
    private String eventName;
    private Long eventHead;
    private LocalDate eventDay;
    private Long venue;
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
    
    public Long getVenue() {
        return venue;
    }
    
    public void setVenue(Long venue) {
        this.venue = venue;
    }
    
    public List<SponsorshipDTO> getSponsorships() {
        return sponsorships;
    }
    
    public void setSponsorships(List<SponsorshipDTO> sponsorships) {
        this.sponsorships = sponsorships;
    }
}