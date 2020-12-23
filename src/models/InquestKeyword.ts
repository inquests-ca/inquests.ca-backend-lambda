import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { InquestCategory } from './InquestCategory';
import { InquestKeywordSynonyms } from './InquestKeywordSynonyms';

@Entity('inquestKeyword')
export class InquestKeyword extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  inquestKeywordId!: string;

  @Column('char', { length: 100 })
  inquestCategoryId!: string;

  @Column('varchar', { unique: true, length: 255 })
  name!: string;

  @Column('varchar', { nullable: true, length: 255 })
  description!: string | null;

  @ManyToOne(() => InquestCategory, (inquestCategory) => inquestCategory.inquestKeywords)
  @JoinColumn({ name: 'inquestCategoryId', referencedColumnName: 'inquestCategoryId' })
  inquestCategory!: InquestCategory;

  @OneToMany(
    () => InquestKeywordSynonyms,
    (InquestKeywordSynonyms) => InquestKeywordSynonyms.inquestKeyword
  )
  inquestKeywordSynonyms!: InquestKeywordSynonyms[];
}
