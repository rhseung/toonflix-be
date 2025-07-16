import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Post Content' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId: number;
}
