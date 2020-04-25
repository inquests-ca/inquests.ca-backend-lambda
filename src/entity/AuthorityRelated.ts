import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Authority } from './Authority';

@Index('fk_authorityId_authorityRelated2_idx', ['relatedAuthorityId'], {})
@Entity('authorityRelated', { schema: 'inquestsca' })
export class AuthorityRelated extends BaseEntity {
  @Column('int', { primary: true, name: 'authorityId', unsigned: true })
  authorityId: number;

  @Column('int', { primary: true, name: 'relatedAuthorityId', unsigned: true })
  relatedAuthorityId: number;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityRelateds,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'authorityId', referencedColumnName: 'authorityId' }])
  authority: Authority;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityRelateds2,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'relatedAuthorityId', referencedColumnName: 'authorityId' }])
  relatedAuthority: Authority;
}
