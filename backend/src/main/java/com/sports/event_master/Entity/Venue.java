package com.sports.event_master.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "venues")
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id")
    private Long venueId;

    @Column(nullable = false,name="venue_type")
    private String venueType;

    @Column(nullable=false,name="seating_area")
    private Long seatingArea;

    @Column(nullable=false,name="venue_incharge")
    private Long venueIncharge;

    @Column(nullable=false,name="venue_facility")
    private String venueFacility;

    @Column(nullable=false,name="venue_name")
    private String venueName;

    @Column(nullable = false,name = "user_id")
    private Long userId;



    public Long getVenueIncharge() {
        return venueIncharge;
    }

    public void setVenueIncharge(Long venueIncharge) {
        this.venueIncharge = venueIncharge;
    }

    public String getVenueFacility() {
        return venueFacility;
    }

    public void setVenueFacility(String venueFacility) {
        this.venueFacility = venueFacility;
    }

    public String getVenueType() {
        return venueType;
    }

    public void setVenueType(String venueType) {
        this.venueType = venueType;
    }

    public Long getSeatingArea() {
        return seatingArea;
    }

    public void setSeatingArea(Long seatingArea) {
        this.seatingArea = seatingArea;
    }

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public Long getVenueId() {
        return venueId;
    }

    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
