import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { DeathManner } from './DeathManner';
import { Inquest } from './Inquest';
import { InquestType } from './InquestType';

@Index('deceasedID_UNIQUE', ['deceasedId'], { unique: true })
@Index('fk_inquestID_deceased_idx', ['inquestId'], {})
@Index('fk_deathMannerId_deceased1_idx', ['deathMannerId'], {})
@Index('fk_inquestTypeId_deceased1_idx', ['inquestTypeId'], {})
@Entity('deceased', { schema: 'inquestsca' })
export class Deceased extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'deceasedId', unsigned: true })
  deceasedId: number;

  @Column('int', { name: 'inquestId', nullable: true, unsigned: true })
  inquestId: number | null;

  @Column('char', { name: 'inquestTypeId', nullable: true, length: 100 })
  inquestTypeId: string | null;

  @Column('char', { name: 'deathMannerId', nullable: true, length: 100 })
  deathMannerId: string | null;

  @Column('varchar', { name: 'deathCause', nullable: true, length: 255 })
  deathCause: string | null;

  @Column('date', { name: 'deathDate', nullable: true })
  deathDate: string | null;

  @Column('varchar', { name: 'lastName', nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { name: 'givenNames', nullable: true, length: 255 })
  givenNames: string | null;

  @Column('int', { name: 'age', nullable: true })
  age: number | null;

  @Column('varchar', { name: 'sex', nullable: true, length: 255 })
  sex: string | null;

  @ManyToOne(
    () => DeathManner,
    deathManner => deathManner.deceaseds,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'deathMannerId', referencedColumnName: 'deathMannerId' }])
  deathManner: DeathManner;

  @ManyToOne(
    () => Inquest,
    inquest => inquest.deceaseds,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'inquestId', referencedColumnName: 'inquestId' }])
  inquest: Inquest;

  @ManyToOne(
    () => InquestType,
    inquestType => inquestType.deceaseds,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'inquestTypeId', referencedColumnName: 'inquestTypeId' }])
  inquestType: InquestType;
}
