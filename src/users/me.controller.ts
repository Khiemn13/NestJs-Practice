import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './users.service';
import { User } from './users.entity';

@Controller('me')
export class MeController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req: any): Promise<User> {
    // req.user comes from JwtStrategy.validate()
    console.log('req.user in /me:', req.user);
    
    const userId = req.user.userId; 
    return this.userService.findOne(userId);
  }
}
