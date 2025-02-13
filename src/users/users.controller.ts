import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
