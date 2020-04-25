import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { AuthorityCitations } from './AuthorityCitations';
import { AuthorityDocument } from './AuthorityDocument';
import { Inquest } from './Inquest';
import { AuthorityKeyword } from './AuthorityKeyword';
import { AuthorityRelated } from './AuthorityRelated';
import { AuthoritySuperceded } from './AuthoritySuperceded';

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
    () => AuthorityCitations,
    authorityCitations => authorityCitations.authority
  )
  authorityCitations: AuthorityCitations[];

  @OneToMany(
    () => AuthorityCitations,
    authorityCitations => authorityCitations.citedAuthority
  )
  authorityCitedBy: AuthorityCitations[];

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

  @OneToMany(
    () => AuthorityRelated,
    authorityRelated => authorityRelated.authority
  )
  authorityRelated: AuthorityRelated[];

  // TODO: note that this relationship is undirected (e.g., 1 related to 2 => 2 related to 1); how to prevent duplicates?
  // TODO: lookup how to represent undirected graphs in SQL.
  @OneToMany(
    () => AuthorityRelated,
    authorityRelated => authorityRelated.relatedAuthority
  )
  authorityRelatedDup: AuthorityRelated[];

  @OneToMany(
    () => AuthoritySuperceded,
    authoritySuperceded => authoritySuperceded.authority
  )
  authoritySuperceded: AuthoritySuperceded[];

  @OneToMany(
    () => AuthoritySuperceded,
    authoritySuperceded => authoritySuperceded.supercededAuthority
  )
  authoritySupercededBy: AuthoritySuperceded[];
}
