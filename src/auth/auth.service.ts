// Logic, validate user, generate token, register
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service'; // your existing service
import { User } from '../users/users.entity';
import { CreateUserDto } from '../users/dto/user_create.dto';  

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /*
    1. Validate login credentials (email + password)
     Returns user WITHOUT password if valid, or null if invalid.
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    // Remove password before returning
    const { password, ...result } = user as any;
    return result;
  }

  /*
   2. Generate a JWT token for a user
  */
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.getTokens(user);

    await this.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }


  /*
   3. Create user
  */
  async register(dto: CreateUserDto) {
  // 1. Check if email already exists
  const existing = await this.usersService.findByEmail(dto.email);
  if (existing) {
    throw new ConflictException('Email already exists');
  }

  // 2. Create user (password will be hashed by @BeforeInsert in entity)
  const user = await this.usersService.create(dto);

  // 3. Remove password from return object
  const { password, ...safeUser } = user;

  return safeUser;
}

  // 4. Generate Tokens, refresh and access
  private async getTokens(user: User) {
    const payload = { // payload here
      sub: user.id,
      email: user.email,
    };

    // signAsync(payload, options): Build the JWT Token
    const accessToken = await this.jwtService.signAsync(payload, { 
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
  const hash = await bcrypt.hash(refreshToken, 10);
  await this.usersService.update(userId, { refreshTokenHash: hash });
}

async refreshTokens(userId: number, refreshToken: string) {
  const user = await this.usersService.findById(userId);
  if (!user || !user.refreshTokenHash)
    throw new UnauthorizedException('No refresh token stored');

  const match = await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!match)
    throw new UnauthorizedException('Invalid refresh token');

  // verify signature
  try {
    this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    });
  } catch {
    throw new UnauthorizedException('Expired refresh token');
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await this.getTokens(user);

  await this.saveRefreshToken(user.id, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
}

}
