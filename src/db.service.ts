import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DbService {
  private client: Client;

  constructor() {
    // Initialize a Postgres client with connection info
    this.client = new Client({ // Declare 
      host: 'localhost',      // Nestjs run locally 
      port: 5432,
      user: 'root',
      password: '1234',
      database: 'database',
    });

    // Connect immediately
    this.client.connect()
      .then(() => console.log('Connected to Postgres'))
      .catch(err => console.error('Failed to connect', err));
  }


  async query(data: string, params?: any[]) {
    // Directly run to get all data from table so dont have to connect it again
    return this.client.query(data, params);
  }
}