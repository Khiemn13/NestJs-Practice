import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ // The super() function call configures HOW Passport should find and verify JWT tokens.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // tells Passport WHERE to look for the JWT token Authorization: Bearer <token>
      ignoreExpiration: false, // ignore expired token
      secretOrKey: 'secretKey', // key to to verify JWT 
    });
  }
  // wait and run after the the JWT is verified.  
  async validate(payload: any) {
    return { username: payload.username };
  }
}
