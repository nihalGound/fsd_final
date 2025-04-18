import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventService } from "../../services/event.service";
import { Event, Sponsorship } from "../../models/event.model";
import { EventResultModalComponent } from "../../modals/event-result-modal.component";
import { VenueUpdateModalComponent } from "../../modals/venue-update-modal.component";

@Component({
  selector: "app-event-details",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    <div class="container" *ngIf="event">
      <div class="event-header">
        <div>
          <h1>{{ event.eventName }}</h1>
          <mat-chip-set>
            <mat-chip [color]="isUpcoming() ? 'accent' : 'warn'" highlighted>
              {{ isUpcoming() ? "Upcoming" : "Past Event" }}
            </mat-chip>
          </mat-chip-set>
        </div>
      </div>

      <div class="content-grid">
        <!-- Event Details Card -->
        <mat-card class="details-card">
          <mat-card-header>
            <mat-card-title>Event Details</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-row">
              <mat-icon>sports</mat-icon>
              <div class="info-content">
                <span class="info-label">Event Type</span>
                <span class="info-value">{{ event.eventType }}</span>
              </div>
            </div>
            <div class="info-row">
              <mat-icon>event</mat-icon>
              <div class="info-content">
                <span class="info-label">Date</span>
                <span class="info-value">{{
                  event.eventDay | date : "fullDate"
                }}</span>
              </div>
            </div>
            <div class="info-row">
              <mat-icon>location_on</mat-icon>
              <div class="info-content">
                <span class="info-label">Venue</span>
                <span class="info-value">{{ getVenueName() }}</span>
              </div>
            </div>
            <div class="info-row">
              <mat-icon>person</mat-icon>
              <div class="info-content">
                <span class="info-label">Event Head</span>
                <span class="info-value">ID: {{ event.eventHead }}</span>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions *ngIf="isUpcoming() && isEventHead()">
            <button mat-raised-button (click)="updateVenue()">
              <mat-icon>edit_location</mat-icon>
              Update Venue
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Sponsorship Card -->
        <mat-card
          class="sponsorship-card"
          *ngIf="acceptedSponsorships.length > 0"
        >
          <mat-card-header>
            <mat-card-title>Event Sponsors</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div
              *ngFor="let sponsorship of acceptedSponsorships"
              class="sponsor-details"
            >
              <div class="info-row">
                <mat-icon>business</mat-icon>
                <div class="info-content">
                  <span class="info-label">Sponsor Name</span>
                  <span class="info-value">{{ sponsorship.sponsor.name }}</span>
                </div>
              </div>
              <div class="info-row">
                <mat-icon>attach_money</mat-icon>
                <div class="info-content">
                  <span class="info-label">Contribution Amount</span>
                  <span class="info-value">{{
                    sponsorship.contributionAmount
                  }}</span>
                </div>
              </div>
              <div class="info-row">
                <mat-icon>calendar_today</mat-icon>
                <div class="info-content">
                  <span class="info-label">Request Date</span>
                  <span class="info-value">{{
                    sponsorship.requestDate | date
                  }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Sponsorship Requests -->
        <mat-card
          class="sponsorship-requests"
          *ngIf="isUpcoming() && isEventHead()"
        >
          <mat-card-header>
            <mat-card-title>Sponsorship Requests</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <button
              mat-raised-button
              color="primary"
              (click)="showSponsorshipRequests()"
              *ngIf="!showingSponsorship"
            >
              <mat-icon>monetization_on</mat-icon>
              Show Sponsorship Requests
            </button>

            <div *ngIf="showingSponsorship" class="requests-list">
              <mat-card
                *ngFor="let request of sponsorshipRequests"
                class="request-card"
              >
                <mat-card-content>
                  <div class="info-row">
                    <mat-icon>business</mat-icon>
                    <div class="info-content">
                      <span class="info-label">Sponsor</span>
                      <span class="info-value">{{ request.sponsor.name }}</span>
                    </div>
                  </div>
                  <div class="info-row">
                    <mat-icon>attach_money</mat-icon>
                    <div class="info-content">
                      <span class="info-label">Amount</span>
                      <span class="info-value">{{
                        request.contributionAmount
                      }}</span>
                    </div>
                  </div>
                  <div class="info-row">
                    <mat-icon>calendar_today</mat-icon>
                    <div class="info-content">
                      <span class="info-label">Requested On</span>
                      <span class="info-value">{{
                        request.requestDate | date
                      }}</span>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions
                  *ngIf="request.status === 'PENDING' && isEventHead()"
                >
                  <button
                    mat-raised-button
                    color="primary"
                    (click)="acceptSponsorship(request.id)"
                  >
                    Accept Sponsorship
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Results Card -->
        <mat-card class="results-card" *ngIf="!isUpcoming()">
          <mat-card-header>
            <mat-card-title>Event Results</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <button mat-raised-button color="accent" (click)="showResults()">
              <mat-icon>emoji_events</mat-icon>
              View Results
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 32px;
        max-width: 1200px;
        margin: 0 auto;
        background: #1a1a1a;
        min-height: calc(100vh - 64px);
      }

      .event-header {
        margin-bottom: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .event-header h1 {
        margin: 0;
        color: white;
        font-size: 2rem;
      }

      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 24px;
      }

      mat-card {
        background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .details-card,
      .sponsorship-card,
      .sponsorship-requests,
      .results-card {
        height: fit-content;
      }

      mat-card-header {
        margin-bottom: 16px;
      }

      mat-card-title {
        color: white;
        font-size: 1.5rem;
      }

      .info-row {
        display: flex;
        align-items: center;
        margin: 16px 0;
        gap: 16px;
      }

      .info-content {
        display: flex;
        flex-direction: column;
      }

      .info-label {
        color: #b0b0b0;
        font-size: 0.9rem;
      }

      .info-value {
        color: white;
        font-size: 1.1rem;
      }

      mat-icon {
        color: #69f0ae;
      }

      .requests-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .request-card {
        background: #2d2d2d;
        margin: 8px 0;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      button mat-icon {
        color: inherit;
      }

      mat-card-actions {
        padding: 16px;
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event?: Event;
  sponsorshipRequests: Sponsorship[] = [];
  acceptedSponsorships: Sponsorship[] = [];
  showingSponsorship = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.params["id"]);
    this.loadEventDetails(eventId);
  }

  loadEventDetails(eventId: number) {
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;
      if (this.event?.sponsorships && this.event.sponsorships.length > 0) {
        this.acceptedSponsorships = this.event.sponsorships.filter(
          (s) => s.status === "ACCEPTED"
        );
        this.sponsorshipRequests = this.event.sponsorships.filter(
          (s) => s.status === "PENDING"
        );
      }
    });
  }

  isUpcoming() {
    return this.event ? new Date(this.event.eventDay) > new Date() : false;
  }

  isEventHead() {
    return this.event?.eventHead === this.eventService.getUserId().id;
  }

  showSponsorshipRequests() {
    if (!this.event) return;
    this.showingSponsorship = true;
  }

  acceptSponsorship(sponsorshipId: number) {
    this.eventService.acceptSponsorshipRequest(sponsorshipId).subscribe(() => {
      this.snackBar.open("Sponsorship accepted successfully!", "Close", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      if (this.event) {
        this.loadEventDetails(this.event.eventId);
      }
    });
  }

  updateVenue() {
    if (!this.event) return;
    console.log(this.event)
    const dialogRef = this.dialog.open(VenueUpdateModalComponent, {
      width: "800px",
      data: {
        eventId: this.event.eventId,
        bookingDate: this.event.eventDay,
      },
      panelClass: "custom-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.event) {
        this.loadEventDetails(this.event.eventId);
        this.snackBar.open("Venue updated successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
    });
  }

  getVenueName() {
    if (this.event?.venueBooked?.venue.venueName)
      return this.event.venueBooked.venue.venueName;
    return "No Booking";
  }

  showResults() {
    if (!this.event) return;
    this.dialog.open(EventResultModalComponent, {
      width: "600px",
      data: { eventId: this.event.eventId },
      panelClass: "custom-dialog",
    });
  }

  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(this.event?.eventId!).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, "Close", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          });
          this.router.navigate(["/events"]);
        },
        error: (err) => {
          this.snackBar.open(
            "Failed to delete event. Please try again later.",
            "Close",
            {
              duration: 3000,
              panelClass: ["error-snackbar"],
            }
          );
          console.error("Error deleting event:", err);
        },
      });
    }
  }
}
