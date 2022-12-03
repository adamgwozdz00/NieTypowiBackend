import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {TokenResponse} from "./token.response";
import {AuthenticationService} from "../domain/authentication.service";
import {SkipAuth} from "../annotations/skip.auth";
import {LocalAuthGuard} from "../guards/local.auth.guard";
import {RegistrationRequest} from "./registration.request";
import {RegistrationDTO} from "../domain/registration.dto";
import {ApiBody} from "@nestjs/swagger";
import {LoginRequest} from "./login.request";

@Controller("/authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiBody({type: LoginRequest})
  async login(@Request() req): Promise<TokenResponse> {
    return {token: req.user.token, iat: req.user.iat, exp: req.user.exp}
  }

  @SkipAuth()
  @Post("/register")
  @ApiBody({type: RegistrationRequest})
  register(@Body() request: RegistrationRequest): Promise<{ success: boolean, failReason: string }> {
    return this.authenticationService.register({
      username: request.username,
      password: request.password,
      confirmedPassword: request.confirmedPassword
    } as RegistrationDTO).then(result => ({
      success: result.success,
      failReason: result.failReason
    }));
  }
}