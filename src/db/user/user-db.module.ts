import {Module} from "@nestjs/common";
import {UserRepositoryProvider} from "./user.repository.impl";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../bl/user/user";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider]
})
export class UserDBModule {

}