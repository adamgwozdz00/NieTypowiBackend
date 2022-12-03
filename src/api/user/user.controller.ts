import {Body, Controller, Delete, Post, Put, Query, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {convertStringToEventType} from "../../bl/event/event-type";
import {EventLocalization} from "../../bl/event/event-localization";
import {EventTitle} from "../../bl/event/event-title";
import {EventDescription} from "../../bl/event/event-description";
import {EventId} from "../../bl/event/event-id";
import {UserService} from "../../bl/user/user.service";
import {UserId} from "../../bl/user/user-id";
import {EditEventRequest} from "./edit-event.request";
import {AddEventRequest} from "./add-event.request";
import {UserOperationResponse} from "./user-operation.response";

@ApiTags("users")
@Controller("/users")
export class UserController {

  constructor(private readonly userService: UserService) {
  }


  @ApiBearerAuth('defaultBearerAuth')
  @Post("/events")
  @ApiResponse({type: UserOperationResponse})
  @ApiBody({type: AddEventRequest})
  public add(@Request() req, @Body() event: AddEventRequest): Promise<UserOperationResponse> {
    const userId = new UserId(req.user.userId);

    return this.userService.addEvent(userId,
        {
          eventType: convertStringToEventType(event.eventType),
          eventTime: event.eventTime,
          eventLocalization: new EventLocalization(event.longitude, event.latitude),
          eventTitle: new EventTitle(event.eventTitle),
          eventDescription: new EventDescription(event.eventDescription)
        }
    )
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Put("/events")
  @ApiResponse({type: UserOperationResponse})
  @ApiBody({type: EditEventRequest})
  public edit(@Request() req, @Body() event: EditEventRequest): Promise<UserOperationResponse> {
    const userId = new UserId(req.user.userId);
    return this.userService.editEvent(userId,
        {
          eventId: new EventId(event.eventId),
          eventTime: event.eventTime,
          eventTitle: new EventTitle(event.eventTitle),
          eventDescription: new EventDescription(event.eventDescription)
        }
    )
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Delete("/events")
  public async delete(@Request() req, @Query('eventId') eventId: number): Promise<void> {
    const userId = new UserId(req.user.userId);
    await this.userService.deleteEvent(userId, new EventId(eventId))
  }
}