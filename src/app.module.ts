import {Module} from '@nestjs/common';
import {SecurityModule} from "./security/security.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configurations from './config/configurations';
import {ApiModule} from "./api/api.module";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {DbModule} from "./db/db.module";
import {User} from "./bl/user/user";
import {Event} from "./bl/event/event";
import {BlModule} from "./bl/bl.module";
import {ReportModule} from "./report/report.module";

@Module({
  imports: [
    ConfigModule.forRoot({load: [configurations]}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [DbModule, ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('TYPE'),
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [User, Event],
        synchronize: true
      } as TypeOrmModuleOptions)
    }),
    SecurityModule,
    ApiModule,
    BlModule,
    DbModule,
    SecurityModule,
  ReportModule],
})
export class AppModule {
}
