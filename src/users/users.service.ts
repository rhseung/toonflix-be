import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { withAccelerate } from '@prisma/extension-accelerate';
import * as bcrypt from 'bcrypt';
import usersConfig from './users.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersConfig.KEY) private config: ConfigType<typeof usersConfig>,
  ) {}

  private prisma = new PrismaClient().$extends(withAccelerate());

  async create(user: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }

    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(this.config.auth.passwordSaltRounds, 10),
    );

    const newUser = {
      ...user,
      password: hashedPassword,
    };

    return await this.prisma.user.create({
      data: { ...newUser },
    });
  }

  async read() {
    return await this.prisma.user.findMany();
  }

  async readById(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async readByEmail(email: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { email } });
    } catch {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async update(id: number, user: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
