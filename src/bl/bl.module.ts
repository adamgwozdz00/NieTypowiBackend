import {Module} from "@nestjs/common";
import {EventModule} from "./event/event.module";

@Module({
  imports: [EventModule],
  providers: [],
  exports: [EventModule]
})
export class BlModule {

}