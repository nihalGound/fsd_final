import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Event,
  Venue,
  VenueBooking,
  Sponsorship,
  CreateEventRequest,
} from "../models/event.model";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private apiUrl = "https://nihal-fsd-backend.onrender.com/api";

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
  }

  getMyEvents(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events/user/${userId}`);
  }

  getSponsoredEvents(sponsorId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events/sponsor/${sponsorId}`);
  }

  getSponsorshipRequests(eventId: number): Observable<Sponsorship[]> {
    return this.http.get<Sponsorship[]>(
      `${this.apiUrl}/events/${eventId}/sponsorships`
    );
  }

  acceptSponsorshipRequest(sponsorshipId: number): Observable<Sponsorship> {
    return this.http.put<Sponsorship>(
      `${this.apiUrl}/events/sponsorships/${sponsorshipId}/accept`,
      {}
    );
  }

  getAvailableVenues(bookingDate: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/venues/availability`, {
      params: { date: bookingDate },
    });
  }

  createVenueBooking(
    eventId: number,
    venueId: number,
    bookingDate: string
  ): Observable<VenueBooking> {
    return this.http.post<VenueBooking>(`${this.apiUrl}/venues/book`, {
      params: { bookingDate: bookingDate, venueId: venueId, eventId },
    });
  }

  updateEventVenue(
    eventId: number,
    venueId: number,
    bookingDate: string
  ): Observable<Event> {
    return this.http.put<Event>(
      `${this.apiUrl}/events/updateVenueBooking`,
      null,
      {
        params: {
          eventId: eventId,
          venueId: venueId,
          bookingDate,
        },
      }
    );
  }

  createEvent(event: CreateEventRequest): Observable<Event> {
    const { venueId, ...eventDetails } = event;

    const params = venueId ? { params: { venueId: venueId.toString() } } : {};
    return this.http.post<Event>(`${this.apiUrl}/events`, eventDetails, params);
  }

  deleteEvent(eventId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/events/delete?eventId=${eventId}`
    );
  }

  getUserId(): { id: number } {
    return { id: 101 };
  }
}
