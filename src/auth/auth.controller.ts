// Controller, handle HTTP request, define route. Call service for actual logic
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user_create.dto';  
import { LoginDto } from '../users/dto/login.dto';              

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register') // path auth/register
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() body: any) {
    const gmail = body.gmail?.trim();
    const password = body.password?.trim();

    return this.authService.login(gmail, password);
  }

  @Post('refresh') // refresh both token, return 2 new token
  async refresh(@Body() body: any) {
  const { userId, refreshToken } = body;
  return this.authService.refreshTokens(userId, refreshToken);
}
}
