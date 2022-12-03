import {EventType} from "./event-type";
import {EventTitle} from "./event-title";
import {EventDescription} from "./event-description";
import {EventLocalization} from "./event-localization";

export interface AddEventDTO {
  readonly eventType: EventType;
  readonly eventTitle: EventTitle,
  readonly eventDescription: EventDescription,
  readonly eventTime: Date,
  readonly eventLocalization: EventLocalization,
}