import {EventId} from "./event-id";
import {Event} from "./event";

export interface EventRepository {
  load(eventId: EventId): Promise<Event>

  save(event: Event): Promise<void>

  delete(eventId: EventId): Promise<void>

  findAllByUserId(userId : number) : Promise<Event[]>
}