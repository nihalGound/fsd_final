package com.sports.event_master.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.Sponsorships;

public interface SponsorshipRepository extends JpaRepository<Sponsorships, Long> {
    List<Sponsorships> findByEvent_Id(Long eventId);
}
