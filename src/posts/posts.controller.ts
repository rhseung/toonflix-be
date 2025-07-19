import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBody({ type: CreatePostDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  @Get()
  async read() {
    return await this.postsService.read();
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async readByAuthor(@Param('id') userId: number) {
    return await this.postsService.readByAuthor(userId);
  }

  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() post: UpdatePostDto) {
    return await this.postsService.update(id, post);
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postsService.delete(id);
  }
}
