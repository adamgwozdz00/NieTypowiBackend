import {Inject, Injectable} from "@nestjs/common";
import {EventRepository} from "../../bl/event/event.repository";
import {EventReport} from "./event-report";
import {Event} from "../../bl/event/event";

@Injectable()
export class EventReportService {
  constructor(@Inject('EventRepo') private repository: EventRepository) {
  }

  public getUserEvents(userId: number): Promise<EventReport[]> {
    return this.repository.findAllByUserId(userId).then(result => this.mapToEventsReports(result));
  }

  private mapToEventsReports(events: Event[]): EventReport[] {
    console.log(events)
    return events.map(e => {
      const stringify = JSON.stringify(e);
      const json = JSON.parse(stringify);
      return new EventReport(
          Number(json['_id']),
          this.getEventType(String(json['eventType'])),
          this.getEventTime(json['eventTime']),
          this.getEventTitle(json['title']),
          this.getEventDescription(json['description']),
          this.getLongitude(json['eventLocalization']),
          this.getLatitude(json['eventLocalization']),
      )
    });
  }

  private getEventType(eventTypeFromDB: string): string {
    if (eventTypeFromDB == '0') {
      return "WORK";
    }
    if (eventTypeFromDB == '1') {
      return "LIFE"
    }
    throw new Error("Unsupported eventType from db");
  }

  private getLongitude(jsonElement: any): number {
    return Number(jsonElement['longitude']);
  }

  private getLatitude(jsonElement: any): number {
    return Number(jsonElement['latitude']);
  }

  private getEventTime(jsonElement: any) {
    return new Date(jsonElement['eventTime']);
  }

  private getEventTitle(jsonElement: any) : string{
    return String(jsonElement['eventTitle']);
  }

  private getEventDescription(jsonElement: any) : string{
    return String(jsonElement['eventDescription']);
  }
}