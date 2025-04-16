package com.sports.event_master.DTO;

public class VenueDTO {
    private Long venueId;
    private String venueName;
    private String venueType;
    private Long seatingArea;
    private Long venueIncharge;
    private String venueFacility;
    private Long userId;

    // Getters and setters
    public Long getVenueId() {
        return venueId;
    }

    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
