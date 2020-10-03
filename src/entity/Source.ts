import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { AuthorityDocument } from './AuthorityDocument';
import { Jurisdiction } from './Jurisdiction';

@Entity('source')
export class Source extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  sourceId: string;

  @Column('char', { nullable: true, length: 100 })
  jurisdictionId: string | null;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { nullable: true, length: 255 })
  code: string | null;

  @Column('int', { unsigned: true })
  rank: number;

  @OneToMany(
    () => AuthorityDocument,
    authorityDocument => authorityDocument.source
  )
  authorityDocuments: AuthorityDocument[];

  @ManyToOne(() => Jurisdiction)
  @JoinColumn({ name: 'jurisdictionId', referencedColumnName: 'jurisdictionId' })
  jurisdiction: Jurisdiction;
}
