// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service'; // your existing service
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 1. Validate login credentials (gmail + password)
   * Returns user WITHOUT password if valid, or null if invalid.
   */
  async validateUser(
    gmail: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    // Find user by email
    const user = await this.usersService.findByEmail(gmail);
    if (!user) return null;

    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    // Remove password before returning
    const { password, ...result } = user as any;
    return result;
  }

  /**
   * 2. Generate a JWT token for a user
   */
  async login(user: any) {
    // Payload that will be encoded into the JWT
    const payload = { username: user.gmail, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
