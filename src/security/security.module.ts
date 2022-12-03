import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {JwtAuthGuard} from "./guards/jwt.auth.guard";
import {JwtStrategy} from "./guards/jwt.strategy";
import {APP_GUARD} from "@nestjs/core";
import {LocalAuthGuard} from "./guards/local.auth.guard";
import {LocalStrategy} from "./guards/local.strategy";
import {AuthenticationService} from "./domain/authentication.service";
import {AuthenticationController} from "./api/authentication.controller";
import {UserDBModule} from "../db/user/user-db.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {expiresIn: configService.get<string>('EXPIRES_IN')},
      }),
    }),
    UserDBModule
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    AuthenticationService,
    LocalAuthGuard,
    LocalStrategy,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    JwtAuthGuard,
    JwtStrategy,
    LocalAuthGuard,
    LocalStrategy,
  ],
  controllers: [
    AuthenticationController
  ]
})
export class SecurityModule {

}