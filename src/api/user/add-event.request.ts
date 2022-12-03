import {ApiProperty} from "@nestjs/swagger";
import {IsDate} from 'class-validator';
import {Type} from 'class-transformer';

export class AddEventRequest {
  @ApiProperty()
  eventType: string;
  @ApiProperty()
  eventTitle: string;
  @ApiProperty()
  eventDescription: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({type: Date})
  eventTime: Date;
  @ApiProperty({type: Number})
  longitude: number;
  @ApiProperty({type: Number})
  latitude: number;
}