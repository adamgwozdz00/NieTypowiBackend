import {Module} from "@nestjs/common";
import {EventReportModule} from "../../report/event/event-report.module";
import {EventController} from "./event.controller";

@Module({
  imports: [EventReportModule],
  controllers: [EventController]
})
export class EventApiModule {

}