import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  template: `
    <div class="sidebar-container">
      <div class="logo-section">
        <mat-icon class="logo-icon">sports</mat-icon>
        <h2>Sports Events</h2>
      </div>
      <mat-nav-list>
        <a mat-list-item routerLink="/events" routerLinkActive="active">
          <mat-icon>event</mat-icon>
          <span>Events</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar-container {
      background: #1a1a1a;
      height: 100%;
      color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    }

    .logo-section {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      background: linear-gradient(to right, #1a1a1a, #2d2d2d);
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #ffffff;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
      background: linear-gradient(45deg, #ffffff, #69f0ae);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    mat-nav-list {
      padding-top: 16px;
    }

    .active {
      background: rgba(255, 255, 255, 0.1) !important;
      border-left: 4px solid #ffffff;
    }

    mat-icon {
      margin-right: 12px;
      color: #ffffff;
    }

    a {
      color: white !important;
      height: 48px !important;
      margin: 8px 0;
      transition: all 0.3s ease;
    }

    a:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  `]
})
export class SidebarComponent {}