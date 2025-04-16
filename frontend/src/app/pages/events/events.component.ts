import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { EventService } from "../../services/event.service";
import { Event } from "../../models/event.model";
import { EventCardComponent } from "../../components/event-card/event-card.component";
import { CreateEventModalComponent } from "../../modals/create-event-modal.component";

@Component({
  selector: "app-events",
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    EventCardComponent,
  ],
  template: `
    <div class="container">
      <mat-tab-group>
        <mat-tab label="All Events" class="label">
          <div class="events-grid">
            <app-event-card
              *ngFor="let event of events"
              [event]="event"
              (click)="navigateToEvent(event.eventId)"
            ></app-event-card>
          </div>
        </mat-tab>
        <mat-tab label="My Events">
          <div class="my-events-container">
            <div *ngIf="myEvents.length === 0" class="empty-state">
              <mat-icon>sports</mat-icon>
              <h2>No Events Created Yet</h2>
              <p>
                Start managing your sports events by creating your first event!
              </p>
              <button
                mat-raised-button
                color="primary"
                (click)="openCreateEventModal()"
              >
                Create Your First Event
              </button>
            </div>
            <div *ngIf="myEvents.length > 0" class="events-grid">
              <app-event-card
                *ngFor="let event of myEvents"
                [event]="event"
                (click)="navigateToEvent(event.eventId)"
              ></app-event-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
      <button
        mat-fab
        color="primary"
        class="add-button"
        (click)="openCreateEventModal()"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        background-color: white;
        min-height: calc(100vh - 40px);
      }

      .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
      }

      .my-events-container {
        padding: 20px;
      }

      .empty-state {
        text-align: center;
        padding: 48px;
        background: linear-gradient(145deg, #f5f5f5, #ffffff);
        border-radius: 12px;
        margin: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .empty-state mat-icon {
        font-size: 64px;
        height: 64px;
        width: 64px;
        color: black;
        margin-bottom: 24px;
      }

      .empty-state h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 16px;
      }

      .empty-state p {
        color: #666;
        margin-bottom: 24px;
      }

      .add-button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(135deg, #69f0ae, #00c853);
      }

      .add-button:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
      }

      ::ng-deep .mat-mdc-tab-group {
        background-color: #8d8d8d;
      }

      --mat-tab-header-inactive-hover-label-text-color{
      color:black}

      ::ng-deep .mat-tab-label {
        color: black; 
      }

      ::ng-deep .mat-tab-label.mat-tab-label-active {
        color: black; 
      }

      ::ng-deep .mat-mdc-tab-body-content {
        overflow: hidden !important;
      }
    `,
  ],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  myEvents: Event[] = [];
  private currentUserId: number;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.currentUserId = this.eventService.getUserId().id;
  }

  ngOnInit() {
    this.loadEvents();
    this.loadMyEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  loadMyEvents() {
    this.eventService.getMyEvents(this.currentUserId).subscribe((events) => {
      this.myEvents = events;
    });
  }

  navigateToEvent(eventId: number) {
    this.router.navigate(["/events", eventId]);
  }

  openCreateEventModal() {
    const dialogRef = this.dialog.open(CreateEventModalComponent, {
      width: "800px",
      maxHeight: "90vh",
      panelClass: "custom-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEvents();
        this.loadMyEvents();
      }
    });
  }
}
