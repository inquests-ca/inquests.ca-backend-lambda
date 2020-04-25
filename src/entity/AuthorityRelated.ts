import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Entity('authorityRelated')
export class AuthorityRelated extends BaseEntity {
  @Column('int', { primary: true, unsigned: true })
  authorityId: number;

  @Column('int', { primary: true, unsigned: true })
  relatedAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityRelated
  )
  @JoinColumn({ name: 'authorityId', referencedColumnName: 'authorityId' })
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityRelatedDup
  )
  @JoinColumn({ name: 'relatedAuthorityId', referencedColumnName: 'authorityId' })
  relatedAuthority: Authority;
}
