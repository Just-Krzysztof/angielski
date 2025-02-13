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
import { WordsService } from './words.service';
import { Word } from './word.entity';
import { FindTranslationDto } from './dto/find-translation.dto';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto, createWordDto.userId);
  }

  @Get()
  async findAll() {
    return this.wordsService.findAll();
  }

  @Post('id')
  async findById(@Body('id') id: string) {
    return this.wordsService.findById(Number(id));
  }

  @Post('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByTranslation(@Body() searchData: FindTranslationDto) {
    return this.wordsService.findByTranslation(searchData.en, searchData.pl);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordsService.remove(Number(id));
  }
}
