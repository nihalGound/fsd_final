package com.sports.event_master.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventHead(Long eventHeadId);

}
