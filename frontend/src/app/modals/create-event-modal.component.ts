import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../services/event.service';
import { CreateEventRequest, venues } from '../models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="create-event-container">
      <h2 mat-dialog-title>Create New Event</h2>
      <mat-stepper linear #stepper>
        <mat-step [stepControl]="eventDetailsForm">
          <ng-template matStepLabel>Event Details</ng-template>
          <mat-card>
            <mat-card-content>
              <form [formGroup]="eventDetailsForm">
                <mat-form-field appearance="fill">
                  <mat-label>Event Name</mat-label>
                  <input matInput formControlName="eventName" required>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Event Type</mat-label>
                  <mat-select formControlName="eventType" required>
                    <mat-option value="Football">Football</mat-option>
                    <mat-option value="Basketball">Basketball</mat-option>
                    <mat-option value="Cricket">Cricket</mat-option>
                    <mat-option value="Tennis">Tennis</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Event Date</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="eventDay" required>
                  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </form>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button matStepperNext [disabled]="!eventDetailsForm.valid">Next</button>
            </mat-card-actions>
          </mat-card>
        </mat-step>

        <mat-step [stepControl]="venueForm">
          <ng-template matStepLabel>Select Venue</ng-template>
          <mat-card>
            <mat-card-content>
              <form [formGroup]="venueForm" class="venue-grid">
                <mat-card *ngFor="let venue of venues" 
                         [class.selected-venue]="venueForm.get('venue')?.value === venue.id"
                         (click)="selectVenue(venue.id)" 
                         class="venue-card">
                  <mat-card-header>
                    <mat-icon mat-card-avatar>location_on</mat-icon>
                    <mat-card-title>{{ venue.name }}</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <p>Capacity: {{ venue.capacity }}</p>
                  </mat-card-content>
                </mat-card>
              </form>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button matStepperNext [disabled]="!venueForm.valid">Next</button>
            </mat-card-actions>
          </mat-card>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Review & Create</ng-template>
          <mat-card>
            <mat-card-content>
              <h3>Event Summary</h3>
              <div class="summary-item">
                <strong>Event Name:</strong> {{ eventDetailsForm.get('eventName')?.value }}
              </div>
              <div class="summary-item">
                <strong>Event Type:</strong> {{ eventDetailsForm.get('eventType')?.value }}
              </div>
              <div class="summary-item">
                <strong>Date:</strong> {{ eventDetailsForm.get('eventDay')?.value | date }}
              </div>
              <div class="summary-item">
                <strong>Venue:</strong> {{ getVenueName(venueForm.get('venue')?.value) }}
              </div>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" (click)="onSubmit()">
                Create Event
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .create-event-container {
      padding: 24px;
      background-color: #1a1a1a;
      color: white;
      max-height: 80vh;
      overflow-y: auto;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .venue-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }

    .venue-card {
      cursor: pointer;
      transition: all 0.3s ease;
      background: #2d2d2d;
      border: 2px solid transparent;
    }

    .venue-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .selected-venue {
      border-color: #69f0ae;
      background: linear-gradient(145deg, #2d2d2d, #3d3d3d);
    }

    .summary-item {
      margin: 12px 0;
      padding: 8px;
      background: #2d2d2d;
      border-radius: 4px;
    }

    mat-card {
      background: #2d2d2d;
      color: white;
      margin: 16px 0;
    }

    mat-card-actions {
      padding: 16px;
    }

    ::ng-deep .mat-step-header {
      color: white !important;
    }

    ::ng-deep .mat-step-icon {
      background-color: #69f0ae !important;
    }

    ::ng-deep .mat-step-label {
      color: white !important;
    }
  `]
})
export class CreateEventModalComponent {
  eventDetailsForm: FormGroup;
  venueForm: FormGroup;
  @ViewChild('stepper') stepper: any;

  venues = venues;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEventModalComponent>,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {
    this.eventDetailsForm = this.fb.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventDay: ['', Validators.required],
      eventHead: [this.eventService.getUserId().id]
    });

    this.venueForm = this.fb.group({
      venue: ['', Validators.required]
    });
  }

  selectVenue(venueId: number) {
    this.venueForm.patchValue({ venue: venueId });
  }

  getVenueName(venueId: number): string {
    const venue = venues.find(v => v.id === venueId);
    return venue ? venue.name : '';
  }

  onSubmit() {
    if (this.eventDetailsForm.valid && this.venueForm.valid) {
      const formValue = {
        ...this.eventDetailsForm.value,
        ...this.venueForm.value
      };

      const request: CreateEventRequest = {
        eventName: formValue.eventName,
        eventType: formValue.eventType,
        eventHead: formValue.eventHead,
        eventDay: formValue.eventDay.toISOString(),
        venue: formValue.venue
      };

      this.eventService.createEvent(request).subscribe(
        result => {
          this.snackBar.open('Event created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dialogRef.close(result);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}