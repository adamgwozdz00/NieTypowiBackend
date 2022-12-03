import {Module} from "@nestjs/common";
import {EventRepositoryProvider} from "./event.repository.impl";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Event} from "../../bl/event/event";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventRepositoryProvider],
  exports: [EventRepositoryProvider]
})
export class EventDbModule {

}