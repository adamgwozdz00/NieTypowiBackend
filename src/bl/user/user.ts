import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "../event/event";
import {AddEventDTO} from "../event/add-event.dto";
import {EventTime} from "../event/event-time";
import {EditEventDTO} from "../event/edit-event.dto";
import {EventId} from "../event/event-id";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string

  @OneToMany(() => Event, event => event.user, {
    cascade: true,
  })
  @JoinTable()
  events: Event[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  addEvent(addEvent: AddEventDTO): void {
    const event = new Event(
        addEvent.eventType,
        addEvent.eventTitle,
        addEvent.eventDescription,
        EventTime.of(addEvent.eventTime), addEvent.eventLocalization)
    this.push(event);
  }

  editEvent(editEvent: EditEventDTO): void {
    const event = this.getEventById(editEvent.eventId)
    if (!this.exists(event)) {
      return;
    }
    event.edit(editEvent);
  }

  deleteEvent(eventId: EventId): void {
    const event = this.getEventById(eventId);
    if (!this.exists(event)) {
      return;
    }
    event.markDeleted();
  }

  private exists(event: Event): boolean {
    return event != undefined;
  }

  private getEventById(eventId: EventId): Event {
    if (this.events == undefined) {
      return undefined;
    }
    return this.events.find(event => event._id == eventId.eventId);
  }

  private push(event: Event): void {
    if (!this.events) {
      this.events = []
    }
    this.events.push(event);
  }
}