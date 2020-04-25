import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Entity('authoritySuperceded')
export class AuthoritySuperceded extends BaseEntity {
  @Column('int', { primary: true, unsigned: true })
  authorityId: number;

  @Column('int', { primary: true, unsigned: true })
  supercededAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authoritySuperceded
  )
  @JoinColumn({ name: 'authorityId', referencedColumnName: 'authorityId' })
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authoritySupercededBy
  )
  @JoinColumn({ name: 'supercededAuthorityId', referencedColumnName: 'authorityId' })
  supercededAuthority: Authority;
}
