import { Entity, JoinColumn, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';

import { AuthorityKeyword } from './AuthorityKeyword';

@Entity('authorityKeywordSynonyms')
export class AuthorityKeywordSynonyms extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  authorityKeywordId!: string;

  @PrimaryColumn('varchar', { length: 255 })
  synonym!: string;

  @ManyToOne(
    () => AuthorityKeyword,
    (authorityKeyword) => authorityKeyword.authorityKeywordSynonyms
  )
  @JoinColumn({ name: 'authorityKeywordId', referencedColumnName: 'authorityKeywordId' })
  authorityKeyword!: AuthorityKeyword;
}
