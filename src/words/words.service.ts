import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {}
  async create(word: Word): Promise<Word> {
    return this.wordsRepository.save(word);
  }
  async findAll(): Promise<Word[]> {
    return this.wordsRepository.find();
  }
  async remove(id: number): Promise<void> {
    await this.wordsRepository.delete(id);
  }
}
