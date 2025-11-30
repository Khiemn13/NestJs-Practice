// Handles HTTP requests (GET, POST, etc.) and calls users.service.

import { Controller, Get, Post, Body, Query } from '@nestjs/common'; 
import { UserService } from './users.service';     

@Controller()                                        
export class UserController {                        
  constructor(private readonly userService: UserService) {} 



@Get('users')                                      
async getAllUsers() {                              
return this.userService.getAllUsers();          
}


@Get('me')                                      
async getMe(@Query('id') id: string) { 
return this.userService.getUserById(Number(id)); 
//async getUserById() {    
//return this.userService.getUserById();          
}

@Post('user')                                     
async createUser(@Body() body: any) {             
const { fname, lname, dob, gmail, password } = body;  
return this.userService.addUser(fname, lname, dob, gmail, password); 
}
}