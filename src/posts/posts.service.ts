import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PostsService {
  private prisma = new PrismaClient().$extends(withAccelerate());

  constructor(private readonly usersService: UsersService) {}

  async create(post: CreatePostDto) {
    await this.usersService.readById(post.authorId);
    return await this.prisma.post.create({ data: { ...post } });
  }

  async read() {
    return await this.prisma.post.findMany();
  }

  async readByAuthor(authorId: number) {
    await this.usersService.readById(authorId);
    return await this.prisma.post.findMany({ where: { authorId } });
  }

  async update(id: number, post: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: { ...post },
    });
  }

  async delete(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
