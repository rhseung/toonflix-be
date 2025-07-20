import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './auth/jwt/jwt.config';
import usersConfig from './users/users.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [jwtConfig, usersConfig],
    }),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
