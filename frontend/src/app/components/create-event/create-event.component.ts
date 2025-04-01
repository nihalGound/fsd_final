import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SportEvent, CreateEventDto } from '../../models/event.model';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <h2>Create New Event</h2>
        
        <form (ngSubmit)="onSubmit()" #eventForm="ngForm">
          <div class="form-group">
            <label>Event Name</label>
            <input type="text" [(ngModel)]="event.eventName" name="eventName" required>
          </div>

          <div class="form-group">
            <label>Event Type</label>
            <input type="text" [(ngModel)]="event.eventType" name="eventType" required>
          </div>

          <div class="form-group">
            <label>Event Head</label>
            <input type="text" [(ngModel)]="event.eventHead" name="eventHead" required>
          </div>

          <div class="form-group">
            <label>Event Date</label>
            <input type="datetime-local" [(ngModel)]="event.eventDay" name="eventDay" required>
          </div>

          <div class="button-group">
            <button type="button" (click)="close.emit()">Cancel</button>
            <button type="submit" class="primary" [disabled]="!eventForm.form.valid">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal {
      background: white;
      padding: 24px;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
    }

    h2 {
      margin: 0 0 24px 0;
      font-size: 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      box-sizing: border-box;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 24px;
    }
  `]
})
export class CreateEventComponent {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<SportEvent>();

  event: CreateEventDto = {
    eventName: '',
    eventType: '',
    eventHead: '',
    eventDay: '',
    venue: Math.floor(Math.random() * 10) + 1
  };

  constructor(private eventService: EventService) {}

  onSubmit() {
    this.eventService.createEvent(this.event).subscribe(
      newEvent => {
        this.created.emit(newEvent);
      }
    );
  }
}