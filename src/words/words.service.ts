import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(word: Partial<Word>, userId: number): Promise<Word> {
    if (!word.en || !word.pl) {
      throw new BadRequestException('Both en and pl arrays are required');
    }

    if (!userId) {
      throw new BadRequestException('Required user id, got nothing');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user?.role) {
      throw new NotFoundException(`User with id ${userId} haven't permissions`);
    }

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const normalizedWord = {
      ...word,
      userId,
      en: word.en.map((w) => w.toLowerCase()),
      pl: word.pl.map((w) => w.toLowerCase()),
    };

    const existingWord = await this.wordsRepository
      .createQueryBuilder('word')
      .where('LOWER(word.en::text)::text[] && LOWER(:en::text)::text[]', {
        en: normalizedWord.en,
      })
      .orWhere('LOWER(word.pl::text)::text[] && LOWER(:pl::text)::text[]', {
        pl: normalizedWord.pl,
      })
      .getOne();

    if (existingWord) {
      throw new ConflictException('Word with this same translation exists');
    }

    return this.wordsRepository.save(normalizedWord);
  }

  async findAll(): Promise<Word[]> {
    return this.wordsRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: number): Promise<Word> {
    const findWord = await this.wordsRepository.findOne({
      where: { id },
    });
    if (!findWord) {
      throw new NotFoundException('Word not found');
    }
    return findWord;
  }

  async findByTranslation(en?: string[], pl?: string[]): Promise<Word[]> {
    const query = this.wordsRepository.createQueryBuilder('word');

    if (!en && !pl) {
      throw new BadRequestException(
        'At least one search parameter (en or pl) is required',
      );
    }

    if (en) {
      query.orWhere(
        'LOWER(word.en::text)::text[] && LOWER(:en::text)::text[]',
        { en },
      );
    }
    if (pl) {
      query.orWhere(
        'LOWER(word.pl::text)::text[] && LOWER(:pl::text)::text[]',
        { pl },
      );
    }

    return query.getMany();
  }

  async remove(id: number): Promise<void> {
    await this.wordsRepository.delete(id);
  }
}
