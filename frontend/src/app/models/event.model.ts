export interface Event {
  eventId: number;
  eventType: string;
  eventName: string;
  eventHead: number;
  eventDay: string;
  venueBooked: VenueBooking | null;
  sponsorships: Sponsorship[];
}

export interface Venue {
  venueId: number;
  venueName: string;
  venueType: string | null;
  seatingArea: number;
  venueIncharge: number;
  venueFacility: string;
}

export interface VenueBooking {
  bookingId: number;
  venue: Venue;
  bookingDate: string;
}

export interface Sponsor {
  id: number;
  name: string;
  registrationDate: string;
}

export interface Sponsorship {
  id: number;
  sponsor: Sponsor;
  event: Event;
  contributionAmount: number;
  status: "PENDING" | "ACCEPTED";
  requestDate: string;
}

export interface CreateEventRequest {
  eventType: string;
  eventName: string;
  eventHead: number;
  eventDay: string;
  venueId?: number;
}

export interface EventResult {
  position: number;
  participantName: string;
  prize: number;
}
