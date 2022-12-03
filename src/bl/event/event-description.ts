import {Column} from "typeorm";

export class EventDescription {
  @Column({name: "description"})
  private eventDescription: string
  constructor(eventDescription: string) {
    this.eventDescription = eventDescription;
  }
}