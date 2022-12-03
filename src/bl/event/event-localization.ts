import {Column} from "typeorm";

export class EventLocalization {
  @Column({name: "longitude", type: "numeric"})
  private longitude: number;
  @Column({name: "latitude", type: "numeric"})
  private latitude: number;


  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}