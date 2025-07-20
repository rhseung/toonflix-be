import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import jwtConfig from './jwt/jwt.config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: ConfigType<typeof jwtConfig> | undefined =
          configService.get('jwt');

        if (config != null) {
          return {
            signOptions: { expiresIn: '1y' },
            secret: config.jwt.secretKey,
          };
        } else {
          throw new Error('jwt configuration is not defined');
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
