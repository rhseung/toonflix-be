import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Validated } from '../auth/jwt/jwt.payload';

interface AuthenticatedRequest {
  user: Validated;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Validated => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user.id;
  },
);
