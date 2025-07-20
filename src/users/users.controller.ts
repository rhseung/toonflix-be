import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 409, description: 'Conflict: User already exists' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async read() {
    return await this.usersService.read();
  }

  @ApiResponse({ status: 404, description: 'Not Found: User not found' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Get()
  async readById(@Query('id') id: number) {
    return await this.usersService.readById(id);
  }

  @ApiResponse({ status: 404, description: 'Not Found: User not found' })
  @ApiParam({ name: 'email', type: String })
  @UseGuards(JwtAuthGuard)
  @Get()
  async readByEmail(@Query('email') email: string) {
    return await this.usersService.readByEmail(email);
  }

  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Query('id') id: number, @Body() user: UpdateUserDto) {
    return await this.usersService.update(id, user);
  }

  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
