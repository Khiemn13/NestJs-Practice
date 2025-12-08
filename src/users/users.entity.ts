import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';


@Entity('users') // Maps to your existing 'users' table
export class User {
  @PrimaryGeneratedColumn()  // id column, auto-increment
  id: number;

  @Column({ name: 'fname' }) // maps to 'fname' 
  fname: string;

  @Column({ name: 'lname' }) // maps to 'lname' 
  lname: string;

  @Column({ type: 'date' }) // maps to 'dob' 
  dob: string;

  @Column({ name: 'gmail', unique: true }) // maps to 'gmail' unique value // EMail 
  gmail: string;

  
  @Exclude() 
  @Column() // maps to 'password' 
  password: string;

  // @BeforeInsert() runs only when a new row is being inserted
  // Detect new entity -> Run all @BeforeInsert() functions, then insert into DB


  // @BeforeUpdate() run only when an existing row is being updated.
  // Detect entity has changed -> Run @BeforeUpdate() functions, then update in DB
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
  if (!this.password) return;

  // Skip if already hashed
  if (this.password.startsWith('$2b$')) return; // All bcrypt hashes start with $2b$.

  const saltOrRounds = 10;
  this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
