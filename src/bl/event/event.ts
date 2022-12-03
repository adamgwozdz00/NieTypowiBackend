import {EventTitle} from "./event-title";
import {EventDescription} from "./event-description";
import {EventLocalization} from "./event-localization";
import {EventType} from "./event-type";
import {EditEventDTO} from "./edit-event.dto";
import {EventTime} from "./event-time";
import {User} from "../user/user";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Event {
  @ManyToOne(() => User, (user) => user.events, {})
  user: User;
  @Column({enum: EventType})
  eventType: EventType;
  @Column(() => EventTitle, {prefix: ""})
  title: EventTitle;
  @Column(() => EventDescription, {prefix: ""})
  description: EventDescription;
  @Column(() => EventTime, {prefix: ""})
  eventTime: EventTime;
  @Column(() => EventLocalization, {prefix: ""})
  eventLocalization: EventLocalization;

  constructor(eventType: EventType, title: EventTitle, description: EventDescription, eventTime: EventTime, eventLocalization: EventLocalization) {
    this.eventType = eventType;
    this.title = title;
    this.description = description;
    this.eventTime = eventTime;
    this.eventLocalization = eventLocalization;
  }

  @PrimaryGeneratedColumn({name: "id"})
  _id: number;

  get id(): number {
    return this._id;
  }

  edit(editEvent: EditEventDTO) {
    this.title = editEvent.eventTitle;
    this.description = editEvent.eventDescription;
    this.eventTime = EventTime.of(editEvent.eventTime);
  }

  markDeleted() {
    this.user = null;
  }

}