import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { DeathManner } from './DeathManner';
import { Inquest } from './Inquest';
import { InquestType } from './InquestType';

@Entity('deceased')
export class Deceased extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  deceasedId: number;

  @Column('int', { nullable: true, unsigned: true })
  inquestId: number | null;

  @Column('char', { nullable: true, length: 100 })
  inquestTypeId: string | null;

  @Column('char', { nullable: true, length: 100 })
  deathMannerId: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  deathCause: string | null;

  @Column('date', { nullable: true })
  deathDate: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  givenNames: string | null;

  @Column('int', { nullable: true })
  age: number | null;

  @Column('varchar', { nullable: true, length: 255 })
  sex: string | null;

  @ManyToOne(() => DeathManner)
  @JoinColumn({ name: 'deathMannerId', referencedColumnName: 'deathMannerId' })
  deathManner: DeathManner;

  @ManyToOne(
    () => Inquest,
    inquest => inquest.deceased
  )
  @JoinColumn({ name: 'inquestId', referencedColumnName: 'inquestId' })
  inquest: Inquest;

  @ManyToOne(() => InquestType)
  @JoinColumn({ name: 'inquestTypeId', referencedColumnName: 'inquestTypeId' })
  inquestType: InquestType;
}
