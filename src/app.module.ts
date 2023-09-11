import { Module } from '@nestjs/common';

import {EventsModule} from './events/events.module';
import {DBModule} from './schema/db.module';


@Module({
  imports: [DBModule,EventsModule],

})
export class AppModule {}
