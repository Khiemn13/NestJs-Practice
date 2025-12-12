import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // NestJs AuthGuard

@Injectable()
// Guard decide either a request will fail or success to the controller
// use "Guard" from NEstJS with the extends strategy Passsword Strategy
export class JwtAuthGuard extends AuthGuard('jwt') {} //jwt is default name NestJS assign to my PassportStrategy
