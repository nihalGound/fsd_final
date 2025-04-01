import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { SportEvent } from '../../models/event.model';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateEventComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Sport Events</h1>
        <button class="primary" (click)="showCreateModal = true">
          Create Event
        </button>
      </div>

      <div class="events-grid">
        @for (event of events; track event.eventId) {
          <div class="event-card" [routerLink]="['/event', event.eventId]">
            <h2>{{ event.eventName }}</h2>
            <p>Type: {{ event.eventType }}</p>
            <p>Head: {{ event.eventHead }}</p>
            <p>Date: {{ event.eventDay | date }}</p>
          </div>
        }
      </div>

      @if (showCreateModal) {
        <app-create-event
          (close)="showCreateModal = false"
          (created)="onEventCreated($event)"
        ></app-create-event>
      }
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 24px;
      margin: 0;
    }

    .events-grid {
      display: grid;
      gap: 16px;
    }

    .event-card {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: box-shadow 0.3s ease;
    }

    .event-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .event-card h2 {
      font-size: 18px;
      margin: 0 0 12px 0;
    }

    .event-card p {
      color: #666;
      margin: 8px 0;
    }
  `]
})
export class EventListComponent implements OnInit {
  events: SportEvent[] = [];
  showCreateModal = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onEventCreated(event: SportEvent) {
    this.events.push(event);
    this.showCreateModal = false;
  }
}