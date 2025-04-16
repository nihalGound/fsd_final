package com.sports.event_master.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.VenueBooking;

public interface VenueBookingRepository extends JpaRepository<VenueBooking, Long> {
    // Custom query to find VenueBookings by bookingDate
    List<VenueBooking> findByBookingDate(LocalDate bookingDate);

    // Custom query to find VenueBookings by event ID
    List<VenueBooking> findByEventId(Long eventId);

    List<VenueBooking> findByVenue_VenueId(Long venueId);
}
