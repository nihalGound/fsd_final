import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { EventResult } from '../models/event.model';

@Component({
  selector: 'app-event-result-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  template: `
    <div class="result-modal">
      <h2 mat-dialog-title>Event Results</h2>
      <mat-dialog-content>
        <div class="results-container">
          <div *ngFor="let result of results" class="result-card" [ngClass]="'position-' + result.position">
            <div class="position-badge">{{ result.position }}</div>
            <div class="result-details">
              <h3>{{ result.participantName }}</h3>
              <p class="prize">Prize: ₹{{ result.prize }}</p>
            </div>
          </div>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-raised-button color="primary" (click)="onClose()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .result-modal {
        padding: 24px;
        background-color: #1e1e2e;
        color: white;
        border-radius: 12px;
      }

      .results-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }

      .result-card {
        display: flex;
        align-items: center;
        padding: 16px;
        border-radius: 12px;
        background: linear-gradient(145deg, #1a1a2e, #29293d);
        gap: 16px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
      }

      .position-1 {
        border: 2px solid #f9a825; /* Gold */
      }

      .position-2 {
        border: 2px solid #c0c0c0; /* Silver */
      }

      .position-3 {
        border: 2px solid #cd7f32; /* Bronze */
      }

      .position-badge {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: bold;
        background: #69f0ae;
        color: #000;
      }

      .result-details {
        flex: 1;
      }

      h3 {
        margin: 0;
        color: #ffffff;
      }

      .prize {
        margin: 4px 0 0;
        color: #69f0ae;
        font-weight: bold;
      }

      mat-dialog-actions {
        margin-top: 16px;
      }

      button {
        border-radius: 8px;
      }
    `,
  ],
})
export class EventResultModalComponent {
  results: EventResult[] = [
    { position: 1, participantName: 'John Doe', prize: 5000 },
    { position: 2, participantName: 'Jane Smith', prize: 3000 },
    { position: 3, participantName: 'Mike Johnson', prize: 1000 },
  ];

  constructor(
    private dialogRef: MatDialogRef<EventResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number }
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
