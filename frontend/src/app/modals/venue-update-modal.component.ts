import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { EventService } from "../services/event.service";
import { finalize } from "rxjs/operators";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-venue-update-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="venue-update-container">
      <h2 mat-dialog-title>Select New Venue</h2>
      <div *ngIf="isLoadingVenues" class="loading-indicator">
        <mat-spinner></mat-spinner>
      </div>
      <div class="venues-grid" *ngIf="!isLoadingVenues">
        <mat-card
          *ngFor="let venue of availableVenues"
          [class.selected]="selectedVenue === venue.venuId"
          (click)="selectVenue(venue.venueId)"
          class="venue-card"
        >
          <mat-card-header>
            <mat-icon mat-card-avatar>location_on</mat-icon>
            <mat-card-title>{{ venue.venueName }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Capacity: {{ venue.seatingArea }}</p>
          </mat-card-content>
          <mat-card-content>
            <p>Type: {{ venue.venueType }}</p>
          </mat-card-content>
          <mat-card-content>
            <p>Facilities: {{ venue.venueFacility }}</p>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!selectedVenue"
          (click)="onUpdate()"
        >
          Update Venue
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .venue-update-container {
        padding: 24px;
        background-color: #1a1a1a;
        color: white;
      }

      .venues-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
        margin: 24px 0;
        max-height: 60vh;
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

      .venue-card.selected {
        border-color: #69f0ae;
        background: linear-gradient(145deg, #2d2d2d, #3d3d3d);
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 24px;
      }

      mat-card-title {
        color: white;
        font-size: 1.2rem;
      }

      mat-icon {
        color: #69f0ae;
      }

      .loading-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
    `,
  ],
})
export class VenueUpdateModalComponent implements OnInit {
  availableVenues: any[] = [];
  selectedVenue?: number;
  isLoadingVenues: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<VenueUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { eventId: number; bookingDate: string },
    private eventService: EventService
  ) {}

  ngOnInit() {
    // Convert bookingDate string to Date
    this.loadAvailableVenues(this.data.bookingDate);
  }

  loadAvailableVenues(date: string) {
    this.isLoadingVenues = true;
    this.availableVenues = [];
    this.selectedVenue = undefined;

    this.eventService
      .getAvailableVenues(date) // Assuming this API takes an ISO string date
      .pipe(finalize(() => (this.isLoadingVenues = false)))
      .subscribe((venues) => {
        this.availableVenues = venues;
      });
  }

  selectVenue(venueId: number) {
    this.selectedVenue = venueId;
  }

  onUpdate() {
    if (this.selectedVenue) {
      this.eventService
        .updateEventVenue(
          this.data.eventId,
          this.selectedVenue,
          this.data.bookingDate
        )
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
