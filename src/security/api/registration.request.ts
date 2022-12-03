import {ApiProperty} from "@nestjs/swagger";

export class RegistrationRequest {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmedPassword: string;

  constructor(username: string,
              password: string,
              confirmedPassword: string) {
    this.username = username;
    this.password = password;
    this.confirmedPassword = confirmedPassword;
  }
}