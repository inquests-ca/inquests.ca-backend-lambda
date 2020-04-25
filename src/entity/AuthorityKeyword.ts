import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { AuthorityCategory } from './AuthorityCategory';

@Entity('authorityKeyword')
export class AuthorityKeyword extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  authorityKeywordId: string;

  @Column('char', { nullable: true, length: 100 })
  authorityCategoryId: string | null;

  @Column('varchar', { unique: true, length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(
    () => AuthorityCategory,
    authorityCategory => authorityCategory.authorityKeywords
  )
  @JoinColumn({ name: 'authorityCategoryId', referencedColumnName: 'authorityCategoryId' })
  authorityCategory: AuthorityCategory;
}
