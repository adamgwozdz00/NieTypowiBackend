import {Injectable, Provider} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../bl/user/user";
import {Repository} from "typeorm";
import {UserRepository} from "../../bl/user/user.repository";
import {UserId} from "../../bl/user/user-id";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
  }

  findByUsername(username: string): Promise<User> {
    return this.repository.findOneBy({username: username});
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async load(userId: UserId): Promise<User> {
    const user = await this.repository.findOne({
          where: {id: userId.userId},
          relations: ['events']
        }
    )

    return user;
  }

}

export const UserRepositoryProvider: Provider<UserRepository> = {
  provide: 'UserRepo',
  useClass: UserRepositoryImpl
}