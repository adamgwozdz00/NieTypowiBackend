import {Controller, Get, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {EventReportService} from "../../report/event/event-report.service";

@ApiTags("events")
@Controller("/events")
export class EventController {
  constructor(private readonly eventReportService: EventReportService) {
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get()
  public getUserEvents(@Request() req) {
    const userId = req.user.userId
    return this.eventReportService.getUserEvents(userId);
  }
}