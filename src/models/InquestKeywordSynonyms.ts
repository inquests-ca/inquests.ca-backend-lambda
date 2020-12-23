import { Entity, JoinColumn, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';

import { InquestKeyword } from './InquestKeyword';

@Entity('inquestKeywordSynonyms')
export class InquestKeywordSynonyms extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  inquestKeywordId!: string;

  @PrimaryColumn('varchar', { length: 255 })
  synonym!: string;

  @ManyToOne(() => InquestKeyword, (inquestKeyword) => inquestKeyword.inquestKeywordSynonyms)
  @JoinColumn({ name: 'inquestKeywordId', referencedColumnName: 'inquestKeywordId' })
  inquestKeyword!: InquestKeyword;
}
