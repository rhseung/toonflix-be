import { registerAs } from '@nestjs/config';

export default registerAs('users', () => ({
  auth: {
    passwordSaltRounds: process.env.PASSWORD_SALT_ROUNDS!,
  },
}));
