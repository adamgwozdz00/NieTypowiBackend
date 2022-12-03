import {EventTitle} from "./event-title";
import {EventDescription} from "./event-description";
import {EventId} from "./event-id";

export interface EditEventDTO {
  readonly eventId: EventId,
  readonly eventTitle: EventTitle,
  readonly eventDescription: EventDescription,
  readonly eventTime: Date,
}