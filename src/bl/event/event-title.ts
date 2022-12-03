import {Column} from "typeorm";

export class EventTitle {
  @Column({name : "title"})
  private eventTitle : string;
  constructor(eventTitle: string) {
    this.eventTitle = eventTitle;
  }

}