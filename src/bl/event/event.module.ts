import {Module} from "@nestjs/common";
import {EventDbModule} from "../../db/event/event-db.module";

@Module({
  imports: [EventDbModule],
  providers: [],
  exports: []
})
export class EventModule {

}