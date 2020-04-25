import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';
import { Jurisdiction } from './Jurisdiction';

@Index('fk_jurisdictionID_source1_idx', ['jurisdictionId'], {})
@Entity('source', { schema: 'inquestsca' })
export class Source extends BaseEntity {
  @Column('char', {
    primary: true,
    name: 'sourceId',
    comment: 'Generally concatenation of sovereignty code and court code (e.g., CAD_ONCA).',
    length: 100,
  })
  sourceId: string;

  @Column('char', { name: 'jurisdictionId', nullable: true, length: 100 })
  jurisdictionId: string | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'code', nullable: true, length: 255 })
  code: string | null;

  @Column('int', {
    name: 'rank',
    comment: 'Rank which determines the importance of the source, and whether it is binding.',
    unsigned: true,
  })
  rank: number;

  @OneToMany(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.source
  )
  authorityDocuments: AuthorityDocument[];

  @ManyToOne(
    () => Jurisdiction,
    jurisdiction => jurisdiction.sources,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'jurisdictionId', referencedColumnName: 'jurisdictionId' }])
  jurisdiction: Jurisdiction;
}
