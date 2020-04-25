import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Entity('authorityCitations')
export class AuthorityCitations extends BaseEntity {
  @Column('int', { primary: true, unsigned: true })
  authorityId: number;

  @Column('int', { primary: true, unsigned: true })
  citedAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityCitations
  )
  @JoinColumn({ name: 'authorityId', referencedColumnName: 'authorityId' })
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityCitedBy
  )
  @JoinColumn({ name: 'citedAuthorityId', referencedColumnName: 'authorityId' })
  citedAuthority: Authority;
}
