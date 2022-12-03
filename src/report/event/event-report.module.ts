import {Module} from "@nestjs/common";
import {EventReportService} from "./event-report.service";
import {EventDbModule} from "../../db/event/event-db.module";

@Module({
  imports: [EventDbModule],
  providers: [EventReportService],
  exports: [EventReportService]
})
export class EventReportModule {

}