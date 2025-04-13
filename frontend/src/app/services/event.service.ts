import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event, Sponsorship, CreateEventRequest } from "../models/event.model";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private apiUrl = "http://localhost:8081/api";

  constructor(private http: HttpClient) {}

  getUserId(): { id: number } {
    return { id: 101 };
  }

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

  updateEventVenue(eventId: number, newVenue: number): Observable<Event> {
    return this.http.put<Event>(
      `${this.apiUrl}/events/${eventId}/venue`,
      newVenue
    );
  }

  createEvent(event: CreateEventRequest): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }
}
