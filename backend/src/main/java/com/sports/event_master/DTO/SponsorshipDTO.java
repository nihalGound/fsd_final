package com.sports.event_master.DTO;

import java.time.LocalDateTime;

public class SponsorshipDTO {
    private Long id;
    private SponsorDTO sponsor;
    private double contributionAmount;
    private String status;
    private LocalDateTime requestDate;
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public SponsorDTO getSponsor() {
        return sponsor;
    }
    
    public void setSponsor(SponsorDTO sponsor) {
        this.sponsor = sponsor;
    }
    
    public double getContributionAmount() {
        return contributionAmount;
    }
    
    public void setContributionAmount(double contributionAmount) {
        this.contributionAmount = contributionAmount;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getRequestDate() {
        return requestDate;
    }
    
    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
}