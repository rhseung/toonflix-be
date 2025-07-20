import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './payload';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY) private config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secretKey,
      // secretOrKeyProvider: (request, rawJwtToken, done) => {
      //   const secret = this.config.jwt.secretKey;
      //
      //   if (!secret) {
      //     done(new Error('JWT_SECRET environment variable is not set'));
      //   } else {
      //     done(null, secret);
      //   }
      // },
    });
  }

  validate(payload: Payload) {
    const user = payload.sub === '0';

    if (user) return user;
    else throw new UnauthorizedException('접근 오류');
  }
}
