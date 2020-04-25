import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Authority } from './Authority';
import { Deceased } from './Deceased';
import { Jurisdiction } from './Jurisdiction';
import { InquestDocument } from './InquestDocument';
import { InquestKeyword } from './InquestKeyword';

@Index('inquest_id_UNIQUE', ['inquestId'], { unique: true })
@Index('fk_jurisdictionId_inquest1_idx', ['jurisdictionId'], {})
@Entity('inquest', { schema: 'inquestsca' })
export class Inquest extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'inquestId', unsigned: true })
  inquestId: number;

  @Column('char', { name: 'jurisdictionId', length: 100 })
  jurisdictionId: string;

  @Column('tinyint', {
    name: 'primary',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  primary: number | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'overview', nullable: true, length: 255 })
  overview: string | null;

  @Column('varchar', { name: 'synopsis', nullable: true, length: 10000 })
  synopsis: string | null;

  @Column('varchar', { name: 'notes', nullable: true, length: 1000 })
  notes: string | null;

  @Column('varchar', { name: 'presidingOfficer', nullable: true, length: 255 })
  presidingOfficer: string | null;

  @Column('date', { name: 'start', nullable: true })
  start: string | null;

  @Column('date', { name: 'end', nullable: true })
  end: string | null;

  @Column('int', { name: 'sittingDays', nullable: true })
  sittingDays: number | null;

  @Column('int', { name: 'exhibits', nullable: true })
  exhibits: number | null;

  @ManyToMany(
    () => Authority,
    authority => authority.inquests
  )
  authorities: Authority[];

  @OneToMany(
    () => Deceased,
    deceased => deceased.inquest
  )
  deceaseds: Deceased[];

  @ManyToOne(
    () => Jurisdiction,
    jurisdiction => jurisdiction.inquests,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'jurisdictionId', referencedColumnName: 'jurisdictionId' }])
  jurisdiction: Jurisdiction;

  @OneToMany(
    () => InquestDocument,
    inquestDocument => inquestDocument.inquest
  )
  inquestDocuments: InquestDocument[];

  @ManyToMany(
    () => InquestKeyword,
    inquestKeyword => inquestKeyword.inquests
  )
  @JoinTable({
    name: 'inquestKeywords',
    joinColumns: [{ name: 'inquestId', referencedColumnName: 'inquestId' }],
    inverseJoinColumns: [{ name: 'inquestKeywordId', referencedColumnName: 'inquestKeywordId' }],
    schema: 'inquestsca',
  })
  inquestKeywords: InquestKeyword[];
}
