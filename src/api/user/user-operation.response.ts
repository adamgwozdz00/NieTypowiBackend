import {ApiProperty} from "@nestjs/swagger";

export class UserOperationResponse {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  reason: string;


  constructor(success: boolean, reason: string) {
    this.success = success;
    this.reason = reason;
  }

  static createSuccess(): UserOperationResponse {
    return new UserOperationResponse(true, "");
  }

  static createFail(reason): UserOperationResponse {
    return new UserOperationResponse(false, reason);
  }
}