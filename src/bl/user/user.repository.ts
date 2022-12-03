import {User} from "./user";
import {UserId} from "./user-id";


export interface UserRepository {
  save(user: User): Promise<void>

  load(userId: UserId): Promise<User>

  findByUsername(username: string): Promise<User>


}