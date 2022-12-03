import {AuthenticationResult} from "./authentication.result";
import {compareSync, hashSync} from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {RegistrationDTO} from "./registration.dto";
import {UserRepository} from "../../bl/user/user.repository";
import {User} from "../../bl/user/user";


@Injectable()
export class AuthenticationService {

  private static LETTERS = /\D+/g;

  constructor(@Inject('UserRepo') private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService,
              private readonly configService: ConfigService
  ) {
  }

  async authenticate(credentials: { password: string; username: string }): Promise<AuthenticationResult> {
    const user = await this.userRepository.findByUsername(credentials.username);
    if (!user) {
      return AuthenticationResult.createFail("User not exists.");
    }

    if (!this.passwordsMatches(credentials.password, user.password)) {
      return AuthenticationResult.createFail("Passwords not matches.")
    }

    return this.generateToken(user);
  }

  async register(credentials: RegistrationDTO): Promise<AuthenticationResult> {
    const user = await this.userRepository.findByUsername(credentials.username);
    if (user) {
      return AuthenticationResult.createFail("User already exists.");
    }

    if (credentials.password !== credentials.confirmedPassword) {
      return AuthenticationResult.createFail("Passwords not matches.");
    }

    await this.userRepository.save(new User(credentials.username, hashSync(credentials.password, 8)));
    const createdUser = await this.userRepository.findByUsername(credentials.username);
    return this.generateToken(createdUser);
  }


  private passwordsMatches(password: string, password2: string) {
    return compareSync(password, password2);
  }

  private generateToken(user: User) {
    const token = this.jwtService.sign({userId: user.id, username: user.username});
    const iat = new Date().getTime();
    const expiresAt = iat + Number(this.configService.get<string>('EXPIRES_IN_MS').replace(AuthenticationService.LETTERS, ""));
    return AuthenticationResult.createSuccess(token, iat, expiresAt);
  }

}