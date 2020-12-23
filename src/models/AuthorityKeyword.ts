import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { AuthorityCategory } from './AuthorityCategory';
import { AuthorityKeywordSynonyms } from './AuthorityKeywordSynonyms';

@Entity('authorityKeyword')
export class AuthorityKeyword extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  authorityKeywordId!: string;

  @Column('char', { length: 100 })
  authorityCategoryId!: string;

  @Column('varchar', { unique: true, length: 255 })
  name!: string;

  @Column('varchar', { nullable: true, length: 255 })
  description!: string | null;

  @ManyToOne(() => AuthorityCategory, (authorityCategory) => authorityCategory.authorityKeywords)
  @JoinColumn({ name: 'authorityCategoryId', referencedColumnName: 'authorityCategoryId' })
  authorityCategory!: AuthorityCategory;

  @OneToMany(
    () => AuthorityKeywordSynonyms,
    (AuthorityKeywordSynonyms) => AuthorityKeywordSynonyms.authorityKeyword
  )
  authorityKeywordSynonyms!: AuthorityKeywordSynonyms[];
}
