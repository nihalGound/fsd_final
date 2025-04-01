import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SportEvent } from '../../models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      @if (event) {
        <div class="event-detail">
          <div class="header">
            <h1>{{ event.eventName }}</h1>
            <button class="danger" (click)="deleteEvent()">Delete Event</button>
          </div>
          
          <div class="details">
            <div class="detail-item">
              <label>Event Type:</label>
              <p>{{ event.eventType }}</p>
            </div>
            
            <div class="detail-item">
              <label>Event Head:</label>
              <p>{{ event.eventHead }}</p>
            </div>
            
            <div class="detail-item">
              <label>Event Date:</label>
              <p>{{ event.eventDay | date:'medium' }}</p>
            </div>
            
            <div class="detail-item">
              <label>Venue:</label>
              <div class="input-group">
                <input type="number" [(ngModel)]="event.venue">
                <button class="primary" (click)="updateVenue()">Update</button>
              </div>
            </div>
            
            <div class="detail-item">
              <label>Sponsor:</label>
              <div class="input-group">
                <input type="number" [(ngModel)]="event.sponsor">
                <button class="primary" (click)="updateSponsor()">Update</button>
              </div>
            </div>
            
            <div class="detail-item">
              <label>Result:</label>
              <div class="input-group">
                <input type="number" [(ngModel)]="event.result">
                <button class="primary" (click)="updateResult()">Update</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .event-detail {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .details {
      display: grid;
      gap: 16px;
    }

    .detail-item label {
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
    }

    .detail-item p {
      margin: 0;
    }

    .input-group {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .input-group input {
      width: 100px;
    }
  `]
})
export class EventDetailComponent implements OnInit {
  event?: SportEvent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(id).subscribe(event => {
      this.event = event;
    });
  }

  updateVenue() {
    if (!this.event) return;
    this.eventService.updateVenue(this.event.eventId, this.event.venue).subscribe(() => {
      // Success message could be added here
    });
  }

  updateSponsor() {
    if (!this.event || this.event.sponsor === null) return;
    this.eventService.updateSponsor(this.event.eventId, this.event.sponsor).subscribe(() => {
      // Success message could be added here
    });
  }

  updateResult() {
    if (!this.event || this.event.result === null) return;
    this.eventService.updateResult(this.event.eventId, this.event.result).subscribe(() => {
      // Success message could be added here
    });
  }

  deleteEvent() {
    if (!this.event) return;
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.eventId).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}