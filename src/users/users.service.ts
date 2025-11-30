// Contain logic, update database

import { Injectable } from '@nestjs/common'; 
import { DbService } from '../db.service';      // file is db.service.ts but because TYpeScript know .ts file and other reason

@Injectable()                 
export class UserService {   
  constructor(private readonly db: DbService) {} 


async getAllUsers() {                     
const result = await this.db.query('SELECT * FROM users'); 
return result.rows;                     
}


async getUserById(id: number) {                   
const result = await this.db.query(            
    'SELECT * FROM users WHERE id = $1',         
    [id]                                         
);                                             
return result.rows[0];                         
}          

async addUser(
  fname: string,
  lname: string,
  dob: string,
  gmail: string,
  password: string
) {
  const result = await this.db.query(
    `INSERT INTO users (fname, lname, dob, gmail, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [fname, lname, dob, gmail, password]
  );
  return result.rows[0];
}
    
}           
