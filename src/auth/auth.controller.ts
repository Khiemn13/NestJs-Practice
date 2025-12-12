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
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.gmail, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Throw error if no user
    }

    return this.authService.login(user);
  }
}
