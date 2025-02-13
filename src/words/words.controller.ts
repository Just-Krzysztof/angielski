import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { WordsService } from './words.service';
import { Word } from './word.entity';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(@Body() word: Partial<Word>) {
    return this.wordsService.create(word as Word);
  }

  @Get()
  async findAll() {
    return this.wordsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordsService.remove(Number(id));
  }
}
