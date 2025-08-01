import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;
}
