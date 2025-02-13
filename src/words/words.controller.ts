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

  @Post('id')
  async findById(@Body('id') id: string) {
    return this.wordsService.findById(Number(id));
  }

  @Post('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByTranslation(@Body() searchData: FindTranslationDto) {
    console.log('searchData', searchData);

    return this.wordsService.findByTranslation(searchData.en, searchData.pl);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordsService.remove(Number(id));
  }
}
