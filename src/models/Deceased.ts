import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { DeathManner } from './DeathManner';
import { Inquest } from './Inquest';
import { InquestType } from './InquestType';

@Entity('deceased')
export class Deceased extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  deceasedId!: number;

  @Column('int', { unsigned: true })
  inquestId!: number;

  @Column('char', { length: 100 })
  inquestTypeId!: string;

  @Column('char', { length: 100 })
  deathMannerId!: string;

  @Column('char', { length: 100 })
  deathCauseId!: string;

  @Column('varchar', { length: 255 })
  deathCause!: string;

  @Column('date')
  deathDate!: string;

  @Column('varchar', { nullable: true, length: 255 })
  lastName!: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  givenNames!: string | null;

  @Column('int', { nullable: true })
  age!: number | null;

  @Column('varchar', { nullable: true, length: 255 })
  sex!: string | null;

  @ManyToOne(() => DeathManner)
  @JoinColumn({ name: 'deathMannerId', referencedColumnName: 'deathMannerId' })
  deathManner!: DeathManner;

  @ManyToOne(() => Inquest, (inquest) => inquest.deceased)
  @JoinColumn({ name: 'inquestId', referencedColumnName: 'inquestId' })
  inquest!: Inquest;

  @ManyToOne(() => InquestType)
  @JoinColumn({ name: 'inquestTypeId', referencedColumnName: 'inquestTypeId' })
  inquestType!: InquestType;
}
