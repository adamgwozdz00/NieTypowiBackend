import {Module} from "@nestjs/common";
import {UserApiModule} from "./user/user-api.module";
import {EventApiModule} from "./event/event-api.module";

@Module({
  imports: [UserApiModule,EventApiModule],
  exports: [],
})
export class ApiModule {

}