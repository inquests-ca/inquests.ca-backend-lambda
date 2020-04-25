import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { AuthorityKeyword } from './AuthorityKeyword';

@Index('keyword_id_UNIQUE', ['authorityCategoryId'], { unique: true })
@Index('name_UNIQUE', ['name'], { unique: true })
@Entity('authorityCategory', { schema: 'inquestsca' })
export class AuthorityCategory extends BaseEntity {
  @Column('char', { primary: true, name: 'authorityCategoryId', length: 100 })
  authorityCategoryId: string;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => AuthorityKeyword,
    authorityKeyword => authorityKeyword.authorityCategory
  )
  authorityKeywords: AuthorityKeyword[];
}
