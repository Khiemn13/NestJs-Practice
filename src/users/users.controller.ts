// Handles HTTP requests (GET, POST, etc.) and calls users.service.

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './users.service';     
import { User } from './users.entity';
import { CreateUserDto } from './dto/user_create.dto';


@Controller('users')  //Sets the base URL path for all routes inside this controller.                                      
export class UserController {                        
  constructor(private readonly userService: UserService) {} 


  @Get() // GET /users
  findAll(): Promise<User[]> { // run findall function 
    return this.userService.findAll(); // return the list of the user
  }

  // Flow:
  //When client sends a POST /users request with JSON data,
  //NestJS takes the body and puts it into userData 
  //then passes it to userService.create() 
  //saves a new user in the database and returns the created user.
  
  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    console.log('REQUEST BODY:', body);
    return this.userService.create(body);
  }

  @Put(':id') // PUT /users/:id
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> { // run remove, @Param: extract id from the URLi, void: empty value return nothing
    return this.userService.remove(+id);
  }
}