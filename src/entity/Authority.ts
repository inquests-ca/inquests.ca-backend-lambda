import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';
import { Inquest } from './Inquest';
import { AuthorityKeyword } from './AuthorityKeyword';

@Entity('authority')
export class Authority extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  authorityId: number;

  @Column('tinyint', { nullable: true })
  primary: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  overview: string | null;

  @Column('varchar', { nullable: true, length: 10000 })
  synopsis: string | null;

  @Column('varchar', { nullable: true, length: 10000 })
  quotes: string | null;

  @Column('varchar', { nullable: true, length: 1000 })
  notes: string | null;

  @OneToMany(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.authority
  )
  authorityDocuments: AuthorityDocument[];

  @ManyToMany(
    () => Inquest,
    inquest => inquest.authorities
  )
  @JoinTable({
    name: 'authorityInquests',
    joinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'inquestId', referencedColumnName: 'inquestId' },
  })
  inquests: Inquest[];

  @ManyToMany(() => AuthorityKeyword)
  @JoinTable({
    name: 'authorityKeywords',
    joinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
  })
  authorityKeywords: AuthorityKeyword[];

  // TODO: remove AuthorityCitations, AuthorityRelated, AuthoritySuperceded models.
  @ManyToMany(
    () => Authority,
    authority => authority.authorityCitedBy
  )
  @JoinTable({
    name: 'authorityCitations',
    joinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'citedAuthorityId', referencedColumnName: 'authorityId' },
  })
  authorityCitations: Authority[];

  @ManyToMany(
    () => Authority,
    authority => authority.authorityCitations
  )
  @JoinTable({
    name: 'authorityCitations',
    joinColumn: { name: 'citedAuthorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
  })
  authorityCitedBy: Authority[];

  // TODO: assuming that this relationship is undirected (e.g., 1 related to 2 => 2 related to 1), how to prevent duplicates?
  // TODO: lookup how to represent undirected graphs in SQL.
  @ManyToMany(
    () => Authority,
    authority => authority.authorityRelatedDup
  )
  @JoinTable({
    name: 'authorityRelated',
    joinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'relatedAuthorityId', referencedColumnName: 'authorityId' },
  })
  authorityRelated: Authority[];

  @ManyToMany(
    () => Authority,
    authority => authority.authorityRelated
  )
  @JoinTable({
    name: 'authorityRelated',
    joinColumn: { name: 'relatedAuthorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
  })
  authorityRelatedDup: Authority[];

  @ManyToMany(
    () => Authority,
    authority => authority.authoritySupercededBy
  )
  @JoinTable({
    name: 'authoritySuperceded',
    joinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'supercededAuthorityId', referencedColumnName: 'authorityId' },
  })
  authoritySuperceded: Authority[];

  @ManyToMany(
    () => Authority,
    authority => authority.authoritySuperceded
  )
  @JoinTable({
    name: 'authoritySuperceded',
    joinColumn: { name: 'supercededAuthorityId', referencedColumnName: 'authorityId' },
    inverseJoinColumn: { name: 'authorityId', referencedColumnName: 'authorityId' },
  })
  authoritySupercededBy: Authority[];
}
