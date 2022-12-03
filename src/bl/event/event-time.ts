import {Column} from "typeorm";

export class EventTime {
  @Column({name: "time"})
  private eventTime: Date;

  constructor(eventTime: Date) {

    this.eventTime = eventTime;
  }

  static of(date: Date) {
    this.vetoIfTimeBeforeNow(date);
    return new EventTime(date);
  }

  private static vetoIfTimeBeforeNow(eventTime: Date) {
    console.log(new Date())
    if (new Date().getTime() > eventTime.getTime()) {
      throw Error("Incorrect event time.")
    }
  }
}