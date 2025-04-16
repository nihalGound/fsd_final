package com.sports.event_master.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="event_master")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "event_head", nullable = false)
    private Long eventHead;

    @Column(name="event_day",nullable=false)
    private LocalDate eventDay;

    @OneToOne(mappedBy = "event")
    @JsonManagedReference
    private VenueBooking venueBooked;

    @OneToMany(mappedBy = "event")
    @JsonManagedReference
    private List<Sponsorships> sponsorships;

    public List<Sponsorships> getSponsorships() {
        return sponsorships;
    }

    public void setSponsorships(List<Sponsorships> sponsorships) {
        this.sponsorships = sponsorships;
    }

    public Long getEventId() {
        return id;
    }

    public void setEventId(Long eventId) {
        this.id = eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
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

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public VenueBooking getVenueBooked() {
        return venueBooked;
    }

    public void setVenueBooked(VenueBooking venueBooked) {
        this.venueBooked = venueBooked;
    }
}