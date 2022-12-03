import {Injectable, Provider} from "@nestjs/common";
import {EventRepository} from "../../bl/event/event.repository";
import {EventId} from "../../bl/event/event-id";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Event} from "../../bl/event/event";

@Injectable()
export class EventRepositoryImpl implements EventRepository {

  constructor(@InjectRepository(Event) private repository: Repository<Event>) {
  }

  async delete(eventId: EventId): Promise<void> {
    await this.repository.delete({_id: eventId.eventId})
  }

  load(eventId: EventId): Promise<Event> {
    return this.repository.findOneBy({_id: eventId.eventId})
  }

  async save(event: Event): Promise<void> {
    await this.repository.save(event);
  }

  findAllByUserId(userId: number): Promise<Event[]> {
    return this.repository.createQueryBuilder("event")
    .innerJoinAndSelect("event.user","user")
    .where("user.id =:userId",{userId})
    .getMany();
  }

}

export const EventRepositoryProvider: Provider<EventRepository> = {
  provide: 'EventRepo',
  useClass: EventRepositoryImpl
}