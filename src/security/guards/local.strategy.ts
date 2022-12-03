import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {LocalStrategyResult} from "./local.strategy.result";
import {AuthenticationService} from "../domain/authentication.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  async validate(
      username: string,
      password: string,
  ): Promise<LocalStrategyResult> {
    const result = await this.authenticationService.authenticate({
      username: username,
      password: password,
    });
    if (!result.success) {
      throw new UnauthorizedException(undefined, result.failReason);
    }

    return {token: result.token, iat: result.iat, exp: result.exp};
  }
}