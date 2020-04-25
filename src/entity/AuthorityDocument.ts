import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { AuthorityDocumentType } from './AuthorityDocumentType';
import { Authority } from './Authority';
import { Source } from './Source';
import { AuthorityDocumentLinks } from './AuthorityDocumentLinks';

@Index('authorityDocumentId_UNIQUE', ['authorityDocumentId'], { unique: true })
@Index('fk_sourceID_authorityDocuments1_idx', ['sourceId'], {})
@Index('fk_authorityDocumentTypeId_authorityDocuments1_idx', ['authorityDocumentTypeId'], {})
@Index('fk_authorityId_authorityDocuments1', ['authorityId'], {})
@Entity('authorityDocument', { schema: 'inquestsca' })
export class AuthorityDocument extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'authorityDocumentId',
    unsigned: true,
  })
  authorityDocumentId: number;

  @Column('int', { name: 'authorityId', unsigned: true })
  authorityId: number;

  @Column('char', {
    name: 'authorityDocumentTypeId',
    nullable: true,
    length: 100,
  })
  authorityDocumentTypeId: string | null;

  @Column('char', { name: 'sourceId', nullable: true, length: 100 })
  sourceId: string | null;

  @Column('tinyint', { name: 'primary', nullable: true, default: () => "'0'" })
  primary: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'citation', nullable: true, length: 255 })
  citation: string | null;

  @Column('date', { name: 'created', nullable: true })
  created: string | null;

  @ManyToOne(
    () => AuthorityDocumentType,
    authorityDocumentType => authorityDocumentType.authorityDocuments,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    {
      name: 'authorityDocumentTypeId',
      referencedColumnName: 'authorityDocumentTypeId',
    },
  ])
  authorityDocumentType: AuthorityDocumentType;

  @ManyToOne(
    () => Authority,
    authority => authority.authorityDocuments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'authorityId', referencedColumnName: 'authorityId' }])
  authority: Authority;

  @ManyToOne(
    () => Source,
    source => source.authorityDocuments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'sourceId', referencedColumnName: 'sourceId' }])
  source: Source;

  @OneToMany(
    () => AuthorityDocumentLinks,
    authorityDocumentLinks => authorityDocumentLinks.authorityDocument
  )
  authorityDocumentLinks: AuthorityDocumentLinks[];
}
