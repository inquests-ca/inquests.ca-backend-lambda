import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, BaseEntity } from 'typeorm';
import { AuthorityCategory } from './AuthorityCategory';
import { Authority } from './Authority';

@Index('keyword_id_UNIQUE', ['authorityKeywordId'], { unique: true })
@Index('name_UNIQUE', ['name'], { unique: true })
@Index('fk_authorityCategoryId_authorityKeyword1_idx', ['authorityCategoryId'], {})
@Entity('authorityKeyword', { schema: 'inquestsca' })
export class AuthorityKeyword extends BaseEntity {
  @Column('char', { primary: true, name: 'authorityKeywordId', length: 100 })
  authorityKeywordId: string;

  @Column('char', { name: 'authorityCategoryId', nullable: true, length: 100 })
  authorityCategoryId: string | null;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(
    () => AuthorityCategory,
    authorityCategory => authorityCategory.authorityKeywords,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    {
      name: 'authorityCategoryId',
      referencedColumnName: 'authorityCategoryId',
    },
  ])
  authorityCategory: AuthorityCategory;

  @ManyToMany(
    () => Authority,
    authority => authority.authorityKeywords
  )
  authorities: Authority[];
}
