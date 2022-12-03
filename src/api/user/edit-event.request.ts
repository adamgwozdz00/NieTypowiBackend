import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDate} from "class-validator";

export class EditEventRequest {
  @ApiProperty()
  eventTitle: string;
  @ApiProperty()
  eventDescription: string;
  @Type(() => Date)
  @IsDate()
  @ApiProperty({type: Date})
  eventTime: Date;
  @ApiProperty({type: Number})
  eventId: number;
}