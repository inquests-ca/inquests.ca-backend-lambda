import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Index('fk_authorityId_authorityCitations2_idx', ['citedAuthorityId'], {})
@Entity('authorityCitations', { schema: 'inquestsca' })
export class AuthorityCitations extends BaseEntity {
  @Column('int', { primary: true, name: 'authorityId', unsigned: true })
  authorityId: number;

  @Column('int', { primary: true, name: 'citedAuthorityId', unsigned: true })
  citedAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityCitations,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'authorityId', referencedColumnName: 'authorityId' }])
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityCitations2,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'citedAuthorityId', referencedColumnName: 'authorityId' }])
  citedAuthority: Authority;
}
