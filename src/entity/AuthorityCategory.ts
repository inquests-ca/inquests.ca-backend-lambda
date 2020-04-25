import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';
import { AuthorityKeyword } from './AuthorityKeyword';

@Entity('authorityCategory')
export class AuthorityCategory extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  authorityCategoryId: string;

  @Column('varchar', { unique: true, length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => AuthorityKeyword,
    authorityKeyword => authorityKeyword.authorityCategory
  )
  authorityKeywords: AuthorityKeyword[];
}
