package com.sports.event_master.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByVenueIdNotIn(List<Long> venueIds);
    List<Venue> findByUserId(Long userId);
}
