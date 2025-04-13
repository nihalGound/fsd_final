import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./pages/event-details/event-details.component').then(m => m.EventDetailsComponent)
  }
];