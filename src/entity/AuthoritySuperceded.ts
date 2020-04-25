import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Index('fk_authorityId_authorityCitations2_idx', ['supercededAuthorityId'], {})
@Entity('authoritySuperceded', { schema: 'inquestsca' })
export class AuthoritySuperceded extends BaseEntity {
  @Column('int', { primary: true, name: 'authorityId', unsigned: true })
  authorityId: number;

  @Column('int', {
    primary: true,
    name: 'supercededAuthorityId',
    unsigned: true,
  })
  supercededAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authoritySupercededs,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'authorityId', referencedColumnName: 'authorityId' }])
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authoritySupercededs2,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'supercededAuthorityId', referencedColumnName: 'authorityId' }])
  supercededAuthority: Authority;
}
