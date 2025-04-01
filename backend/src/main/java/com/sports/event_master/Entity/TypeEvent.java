package com.sports.event_master.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="event_master")
public class TypeEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "event_head", nullable = false)
    private String eventHead;

    @Column(name="event_day",nullable=false)
    private Date eventDay;

    @Column(name = "venue_id")
    private Long venue;

    @Column(name = "result_id")
    private Long result;

    @Column(name = "sponsor_id")
    private Long sponsor;

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

    public String getEventHead() {
        return eventHead;
    }

    public void setEventHead(String eventHead) {
        this.eventHead = eventHead;
    }

    public Date getEventDay() {
        return eventDay;
    }

    public void setEventDay(Date eventDay) {
        this.eventDay = eventDay;
    }

    public Long getResult() {
        return result;
    }

    public void setResult(Long result) {
        this.result = result;
    }

    public Long getSponsor() {
        return sponsor;
    }

    public void setSponsor(Long sponsor) {
        this.sponsor = sponsor;
    }

    public Long getVenue() {
        return venue;
    }

    public void setVenue(Long venue) {
        this.venue = venue;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
}
