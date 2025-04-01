package com.sports.event_master.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sports.event_master.Entity.TypeEvent;

public interface EventRepository extends JpaRepository<TypeEvent, Long> {

}
