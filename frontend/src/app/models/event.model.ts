export interface Event {
  eventId: number;
  eventType: string;
  eventName: string;
  eventHead: number;
  eventDay: string;
  venue: number;
  sponsorships: Sponsorship[] | null;
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
  venue: number;
}

export interface EventResult {
  position: number;
  participantName: string;
  prize: number;
}

export interface Venue {
  id: number;
  name: string;
  capacity: number;
}

export const venues: Venue[] = [
  { id: 1, name: "Grand Hall", capacity: 500 },
  { id: 2, name: "Riverside Pavilion", capacity: 200 },
  { id: 3, name: "Skyline Banquet", capacity: 350 },
  { id: 4, name: "Ocean View Conference Room", capacity: 120 },
  { id: 5, name: "Mountain Peak Amphitheater", capacity: 800 },
  { id: 6, name: "Downtown Auditorium", capacity: 1000 },
  { id: 7, name: "Heritage Hall", capacity: 250 },
  { id: 8, name: "Greenfield Outdoor Arena", capacity: 600 },
  { id: 9, name: "Civic Center", capacity: 150 },
  { id: 10, name: "Beacon Plaza", capacity: 400 },
];
