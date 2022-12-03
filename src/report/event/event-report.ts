export class EventReport {
  eventId: number;
  eventType: string;
  eventTime: Date;
  eventTitle: string;
  eventDescription: string;
  longitude: number;
  latitude: number;


  constructor(eventId: number, eventType: string, eventTime: Date, eventTitle: string, eventDescription: string, longitude: number, latitude: number) {
    this.eventId = eventId;
    this.eventType = eventType;
    this.eventTime = eventTime;
    this.eventTitle = eventTitle;
    this.eventDescription = eventDescription;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}