// Groups all "user" related features. Declares controller, service, and entities.


import { Module } from '@nestjs/common';           // import Module decorator from NestJS
import { UserService } from './users.service';     // import your service
import { UserController } from './users.controller'; // import your controller
import { DbService } from '../db.service';         // import your DbService (one folder up)

@Module({                                        // define a NestJS module
  controllers: [UserController],                // controllers this module provides
  providers: [UserService, DbService],          // services this module provides
})
export class UserModule {}                       // export the module
