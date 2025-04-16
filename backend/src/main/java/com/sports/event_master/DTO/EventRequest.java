package com.sports.event_master.DTO;

import java.time.LocalDate;

public class EventRequest {
    private String eventType;
    private String eventName;
    private Long eventHead;
    private LocalDate eventDay;
    private Long venueId;

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalDate getEventDay() {
        return eventDay;
    }

    public void setEventDay(LocalDate eventDay) {
        this.eventDay = eventDay;
    }

    public Long getEventHead() {
        return eventHead;
    }

    public void setEventHead(Long eventHead) {
        this.eventHead = eventHead;
    }

    public Long getVenueId() {
        return venueId;
    }

    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    
}
