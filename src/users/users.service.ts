import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({ data: { ...user } });
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
