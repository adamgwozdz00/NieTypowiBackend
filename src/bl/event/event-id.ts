export class EventId {
  constructor(private readonly _eventId: number) {
  }


  get eventId(): number {
    return this._eventId;
  }
}