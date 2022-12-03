import {Module} from "@nestjs/common";
import {UserDBModule} from "./user/user-db.module";
import {EventDbModule} from "./event/event-db.module";

@Module({
  imports: [UserDBModule, EventDbModule],
  exports: [UserDBModule,EventDbModule]
})
export class DbModule {

}