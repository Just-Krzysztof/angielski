import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  en: string[];

  @Column('text', { array: true })
  pl: string[];

  @Column('text')
  addedBy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAdded: Date;
}
