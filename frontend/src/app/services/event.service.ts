import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportEvent, CreateEventDto } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<SportEvent[]> {
    return this.http.get<SportEvent[]>(this.apiUrl);
  }

  getEvent(id: number): Observable<SportEvent> {
    return this.http.get<SportEvent>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: CreateEventDto): Observable<SportEvent> {
    return this.http.post<SportEvent>(`${this.apiUrl}/create`, event);
  }

  deleteEvent(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  updateVenue(id: number, venue: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/changeVenue`, venue);
  }

  updateSponsor(id: number, sponsor: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/changeSponsor`, sponsor);
  }

  updateResult(id: number, result: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/setResult`, result);
  }
}