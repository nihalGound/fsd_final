package com.sports.event_master.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "venue_bookings")
public class VenueBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @OneToOne
    @JoinColumn(name = "event", nullable = false)
    @JsonBackReference
    private Event event;

    @Column(nullable = false, name = "booking_date")
    private LocalDate bookingDate;

    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }


    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }
}
