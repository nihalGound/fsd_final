import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EventService } from "../services/event.service";
import { CreateEventRequest, Venue } from "../models/event.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs/operators";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-create-event-modal",
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
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="create-event-container">
      <h2 mat-dialog-title>Create New Event</h2>
      <mat-stepper linear #stepper>
        <!-- Event Details Step -->
        <mat-step [stepControl]="eventDetailsForm">
          <ng-template matStepLabel>Event Details</ng-template>
          <mat-card>
            <mat-card-content>
              <form [formGroup]="eventDetailsForm">
                <mat-form-field appearance="fill">
                  <mat-label>Event Name</mat-label>
                  <input matInput formControlName="eventName" required />
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
                  <input
                    matInput
                    [matDatepicker]="picker"
                    formControlName="eventDay"
                    required
                  />
                  <mat-datepicker-toggle
                    matIconSuffix
                    [for]="picker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </form>
            </mat-card-content>
            <mat-card-actions align="end">
              <button
                mat-button
                matStepperNext
                [disabled]="!eventDetailsForm.valid"
              >
                Next
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-step>

        <!-- Venue Selection Step -->
        <mat-step>
          <ng-template matStepLabel>Select Venue</ng-template>
          <mat-card>
            <mat-card-content>
              <div *ngIf="isLoadingVenues" class="loading-spinner">
                <mat-spinner diameter="40"></mat-spinner>
                <p>Loading available venues...</p>
              </div>

              <div *ngIf="!isLoadingVenues" class="venue-grid">
                <mat-card
                  *ngFor="let venue of availableVenues"
                  [class.selected-venue]="selectedVenueId === venue.venueId"
                  (click)="selectVenue(venue)"
                  class="venue-card"
                >
                  <mat-card-header>
                    <mat-icon mat-card-avatar>location_on</mat-icon>
                    <mat-card-title>{{ venue.venueName }}</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <p>Capacity: {{ venue.seatingArea }}</p>
                    <p>Facilities: {{ venue.venueFacility }}</p>
                  </mat-card-content>
                </mat-card>

                <mat-card class="venue-card skip-venue" (click)="skipVenue()">
                  <mat-card-header>
                    <mat-icon mat-card-avatar>not_listed_location</mat-icon>
                    <mat-card-title>Skip Venue Selection</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <p>Choose venue later</p>
                  </mat-card-content>
                </mat-card>
              </div>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button matStepperNext>Next</button>
            </mat-card-actions>
          </mat-card>
        </mat-step>

        <!-- Review Step -->
        <mat-step>
          <ng-template matStepLabel>Review & Create</ng-template>
          <mat-card>
            <mat-card-content>
              <h3>Event Summary</h3>
              <div class="summary-item">
                <strong>Event Name:</strong>
                {{ eventDetailsForm.get("eventName")?.value }}
              </div>
              <div class="summary-item">
                <strong>Event Type:</strong>
                {{ eventDetailsForm.get("eventType")?.value }}
              </div>
              <div class="summary-item">
                <strong>Date:</strong>
                {{ eventDetailsForm.get("eventDay")?.value | date }}
              </div>
              <div class="summary-item">
                <strong>Venue:</strong>
                {{ getSelectedVenueName() }}
              </div>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button (click)="onCancel()">Cancel</button>
              <button
                mat-raised-button
                color="primary"
                (click)="onSubmit()"
                [disabled]="isCreating"
              >
                <span *ngIf="!isCreating">Create Event</span>
                <mat-spinner diameter="20" *ngIf="isCreating"></mat-spinner>
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [
    `
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
        max-height: 400px;
        overflow-y: auto;
      }

      .venue-card {
        cursor: pointer;
        transition: all 0.3s ease;
        background: #2d2d2d;
        border: 2px solid transparent;
      }

      .venue-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .selected-venue {
        border-color: #69f0ae;
        background: linear-gradient(145deg, #2d2d2d, #3d3d3d);
      }

      .skip-venue {
        border: 2px dashed #666;
        opacity: 0.8;
      }

      .skip-venue:hover {
        border-color: #999;
        opacity: 1;
      }

      mat-card {
        background: #2d2d2d;
        color: white;
        margin: 16px 0;
      }

      mat-card-actions {
        padding: 16px;
      }

      .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px;
        gap: 16px;
      }

      button[color="primary"] {
        min-width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        color: white;
        margin-bottom: 16px;
      }

      .summary-item {
        margin: 12px 0;
        padding: 8px;
        background: #2d2d2d;
        border-radius: 4px;
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
    `,
  ],
})
export class CreateEventModalComponent {
  eventDetailsForm: FormGroup;
  availableVenues: Venue[] = [];
  selectedVenueId?: number;
  isLoadingVenues = false;
  isCreating = false;
  @ViewChild("stepper") stepper: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEventModalComponent>,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {
    this.eventDetailsForm = this.fb.group({
      eventName: ["", Validators.required],
      eventType: ["", Validators.required],
      eventDay: ["", Validators.required],
      eventHead: [eventService.getUserId().id], 
    });

    this.eventDetailsForm.get("eventDay")?.valueChanges.subscribe((date) => {
      if (date) {
        this.loadAvailableVenues(date);
      }
    });
  }

  loadAvailableVenues(date: Date) {
    this.isLoadingVenues = true;
    this.availableVenues = [];
    this.selectedVenueId = undefined;

    this.eventService
      .getAvailableVenues(date.toISOString().split("T")[0])
      .pipe(finalize(() => (this.isLoadingVenues = false)))
      .subscribe((venues) => {
        this.availableVenues = venues;
      });
  }

  selectVenue(venue: Venue) {
    this.selectedVenueId = venue.venueId;
  }

  skipVenue() {
    this.selectedVenueId = undefined;
  }

  getSelectedVenueName(): string {
    const venue = this.availableVenues.find(
      (v) => v.venueId === this.selectedVenueId
    );
    return venue ? venue.venueName : "To be decided";
  }

  async onSubmit() {
    if (this.eventDetailsForm.valid) {
      this.isCreating = true;
      const formValue = this.eventDetailsForm.value;

      try {
        const request: CreateEventRequest = {
          eventName: formValue.eventName,
          eventType: formValue.eventType,
          eventHead: formValue.eventHead,
          eventDay: formValue.eventDay.toISOString(),
          venueId: this.selectedVenueId,
        };

        const result = await firstValueFrom(
          this.eventService.createEvent(request)
        );

        this.snackBar.open("Event created successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });

        this.dialogRef.close(result);
      } catch (error) {
        this.snackBar.open("Error creating event. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      } finally {
        this.isCreating = false;
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
