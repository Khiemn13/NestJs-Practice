import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module'; // import user feature module 
import { TypeOrmModule } from '@nestjs/typeorm'; // Integrates TypeORM with NestJS
import { User } from './users/users.entity';       // Import the User entity
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [  
    // Configure TypeORM with Postgres connection
    TypeOrmModule.forRoot({
      type: 'postgres',      // Database type
      host: 'localhost',      // DB host 
      port: 5432,            // DB port
      username: 'root',      // DB username
      password: '1234',      // DB password
      database: 'database',  // Database name
      entities: [User],      // Entities that TypeORM manages
      synchronize: true,     // Auto-create tables based on entities 
      }),
    UserModule,
    AuthModule], 
})
export class AppModule {}


