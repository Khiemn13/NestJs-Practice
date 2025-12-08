import { Module } from '@nestjs/common';           // import Module decorator from NestJS
import { UserService } from './users.service';     // import your service
import { UserController } from './users.controller'; // import your controller
import { MeController } from './me.controller'; // import MeController


import { TypeOrmModule } from '@nestjs/typeorm';    // needed for TypeORM repository injection
import { User } from './users.entity';              // "user" TypeORM entity

@Module({                                        
  imports: [TypeOrmModule.forFeature([User])],    // registers User repository
  controllers: [UserController, MeController],                
  providers: [UserService],                      
  exports: [UserService], 

})
export class UserModule {}                       // export the module
