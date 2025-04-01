export interface SportEvent {
  eventId: number;
  eventType: string;
  eventName: string;
  eventHead: string;
  eventDay: string;
  venue: number;
  result: number | null;
  sponsor: number | null;
}

export interface CreateEventDto {
  eventType: string;
  eventName: string;
  eventHead: string;
  eventDay: string;
  venue: number;
}