// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // read from "Authorization: Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',      
    });
  }

  async validate(payload: any) {
    console.log('JWT payload in validate:', payload); 

    // This object becomes req.user
    return {
      userId: payload.sub,
      gmail: payload.gmail,
    };
  }
}
