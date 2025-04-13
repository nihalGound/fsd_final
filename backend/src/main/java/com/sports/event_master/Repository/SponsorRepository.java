package com.sports.event_master.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.Sponsor;

public interface SponsorRepository extends JpaRepository<Sponsor, Long> {
    
}
