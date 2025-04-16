import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { Event } from "../../models/event.model";

@Component({
  selector: "app-event-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  template: `
    <mat-card [ngClass]="getEventStatusClass()">
      <mat-card-header>
        <mat-card-title class="event-title">{{
          event.eventName
        }}</mat-card-title>
        <mat-card-subtitle>{{ event.eventType }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="event-info">
          <div class="info-row">
            <mat-icon>event</mat-icon>
            <span class="info-text">{{ event.eventDay | date }}</span>
          </div>
          <div class="info-row">
            <mat-icon>location_on</mat-icon>
            <span class="info-text">{{ getVenueName() }}</span>
          </div>
          <div class="info-row" *ngIf="getSponsorship()">
            <mat-icon>handshake</mat-icon>
            <span class="info-text">Sponsored by {{ getSponsorship() }}</span>
          </div>
        </div>
        <mat-chip-set>
          <mat-chip [color]="isUpcoming() ? 'accent' : 'warn'" highlighted>
            {{ isUpcoming() ? "Upcoming" : "Past Event" }}
          </mat-chip>
        </mat-chip-set>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 12px;
        background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .upcoming-event {
        border-left: 4px solid #69f0ae;
      }

      .past-event {
        border-left: 4px solid #ff4444;
        opacity: 0.8;
      }

      mat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .event-info {
        margin: 16px 0;
      }

      .info-row {
        display: flex;
        align-items: center;
        margin: 8px 0;
        gap: 8px;
      }

      .info-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 32px);
      }

      mat-icon {
        color: #69f0ae;
        flex-shrink: 0;
      }

      .event-title {
        font-size: 1.4rem;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }

      mat-card-subtitle {
        color: #b0b0b0;
        margin-bottom: 16px;
      }

      mat-chip-set {
        margin-top: auto;
        padding-top: 12px;
      }

      mat-card-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class EventCardComponent {
  @Input() event!: Event;

  getEventStatusClass() {
    return {
      "upcoming-event": this.isUpcoming(),
      "past-event": !this.isUpcoming(),
    };
  }

  isUpcoming() {
    return new Date(this.event.eventDay) > new Date();
  }

  getVenueName(): string {
    const venueName = this?.event.venueBooked?.venue.venueName;
    if (venueName) return venueName;
    return "No booking";
  }

  getSponsorship(): string {
    const sponsorship = this.event.sponsorships?.find(
      (s) => s.status === "ACCEPTED"
    );
    if (sponsorship) return sponsorship.sponsor.name;
    return "";
  }
}
