import {Inject, Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {AddEventDTO} from "../event/add-event.dto";
import {EventResult} from "../event/event-result";
import {EventId} from "../event/event-id";
import {EditEventDTO} from "../event/edit-event.dto";
import {UserId} from "./user-id";

@Injectable()
export class UserService {
  constructor(@Inject('UserRepo') private repository: UserRepository) {
  }

  async addEvent(userId: UserId, event: AddEventDTO): Promise<EventResult> {
    try {
      const user = await this.repository.load(userId);

      user.addEvent(event);
      await this.repository.save(user);
      return EventResult.createSuccess();
    } catch (e) {
      return EventResult.createFail(String(e))
    }
  }

  async editEvent(userId: UserId, event: EditEventDTO): Promise<EventResult> {
    try {
      const user = await this.repository.load(userId);
      console.log(user)
      user.editEvent(event);
      await this.repository.save(user);
      return EventResult.createSuccess();
    } catch (e) {
      return EventResult.createFail(String(e))
    }
  }

  async deleteEvent(userId: UserId, eventId: EventId): Promise<void> {
    const user = await this.repository.load(userId);
    user.deleteEvent(eventId);
    await this.repository.save(user);
  }
}