import {ApiProperty} from "@nestjs/swagger";

export class LoginRequest {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}