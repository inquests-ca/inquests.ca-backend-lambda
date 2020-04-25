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

@Entity()
export class Authority extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'authorityId', unsigned: true })
  authorityId: number;

  @Column('tinyint', {
    name: 'primary',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  primary: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'overview', nullable: true, length: 255 })
  overview: string | null;

  @Column('varchar', { name: 'synopsis', nullable: true, length: 10000 })
  synopsis: string | null;

  @Column('varchar', { name: 'quotes', nullable: true, length: 10000 })
  quotes: string | null;

  @Column('varchar', { name: 'notes', nullable: true, length: 1000 })
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
  authorityCitations2: AuthorityCitations[];

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
    joinColumns: [{ name: 'authorityId', referencedColumnName: 'authorityId' }],
    inverseJoinColumns: [{ name: 'inquestId', referencedColumnName: 'inquestId' }],
    schema: 'inquestsca',
  })
  inquests: Inquest[];

  @ManyToMany(
    () => AuthorityKeyword,
    authorityKeyword => authorityKeyword.authorities
  )
  @JoinTable({
    name: 'authorityKeywords',
    joinColumns: [{ name: 'authorityId', referencedColumnName: 'authorityId' }],
    inverseJoinColumns: [
      {
        name: 'authorityKeywordId',
        referencedColumnName: 'authorityKeywordId',
      },
    ],
    schema: 'inquestsca',
  })
  authorityKeywords: AuthorityKeyword[];

  @OneToMany(
    () => AuthorityRelated,
    authorityRelated => authorityRelated.authority
  )
  authorityRelateds: AuthorityRelated[];

  @OneToMany(
    () => AuthorityRelated,
    authorityRelated => authorityRelated.relatedAuthority
  )
  authorityRelateds2: AuthorityRelated[];

  @OneToMany(
    () => AuthoritySuperceded,
    authoritySuperceded => authoritySuperceded.authority
  )
  authoritySupercededs: AuthoritySuperceded[];

  @OneToMany(
    () => AuthoritySuperceded,
    authoritySuperceded => authoritySuperceded.supercededAuthority
  )
  authoritySupercededs2: AuthoritySuperceded[];
}
