import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { User } from './users.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, // inject TypeORM repository
  ) {}

// Create a new user
// Flow: Call create({ firstName: 'Tester', email: 'abc@gmai.com' })
// TypeORM creates a new row in the DB
// The function returns "Promise" the saved User object 

async create(userData: Partial<User>): Promise<User> { // call asynchronous function that create user. userData: Partial<User> is input. Promise<User>: returns a Promise that resolves to a User object after saving it to the database
  const user = this.userRepo.create(userData); // create entity instance
  return this.userRepo.save(user);             // save to DB
}

// Get all users
async findAll(): Promise<User[]> { // finall: fetch all, Promise<User[]>: returns a Promise that resolves to an array of User objects.
  return this.userRepo.find(); // return all the objects to caller in short
}
 
// Get user by ID
async findOne(id: number): Promise<User> { // call findOne function: fetch one with id:number (input). The function returns a Promise that resolves to a User object.
  const user = await this.userRepo.findOneBy({ id }); // store fetched row where id matches in "user". await: wait till DB query to finish before move on
  if (!user) throw new NotFoundException(`User ${id} not found`); // if user is null or then throw error
  /* 
  BadRequestException,       // 400
  UnauthorizedException,     // 401
  ForbiddenException,        // 403
  NotFoundException,         // 404
  InternalServerErrorException, // 500
  */
  return user;
}


async update(id: number, userData: Partial<User>): Promise<User> { // call update function: update one with id:number (input). userData(input). Partial<User> means all fields are optional.
  const result = await this.userRepo.preload({
    id,
    ...userData,
  });

  if (!result) {
    throw new NotFoundException(`User ${id} not found`);
  }

  // this WILL trigger @BeforeUpdate()
  return this.userRepo.save(result);
}

// Delete user by ID
async remove(id: number): Promise<void> { // call update remove: remove one with id:number (input). userData(input), <void> == doesnt return anything empty. 
  const result = await this.userRepo.delete(id); // await wait till DB query complete beofre move on, this.userRepo.delete(id), run delete query 
  
  if (result.affected === 0) {
    // No rows were updated → user not found
    throw new NotFoundException(`User ${id} not found`);
  }
}
// Method for login
async findByEmail(gmail: string): Promise<User | null> { // fallback
  return this.userRepo.findOneBy({ gmail }); // return null if not found
}
}           
