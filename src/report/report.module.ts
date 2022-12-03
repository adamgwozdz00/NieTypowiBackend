import {Module} from "@nestjs/common";
import {EventDbModule} from "../db/event/event-db.module";
import {EventReportModule} from "./event/event-report.module";

@Module({
  imports: [EventReportModule],
  providers: [],
  exports: [EventReportModule]
})
export class ReportModule {

}