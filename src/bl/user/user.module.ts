import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDBModule} from "../../db/user/user-db.module";


@Module({
  imports: [UserDBModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {

}