import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { Deceased } from './Deceased';

@Index('deathMannerId_UNIQUE', ['deathMannerId'], { unique: true })
@Entity('deathManner', { schema: 'inquestsca' })
export class DeathManner extends BaseEntity {
  @Column('char', { primary: true, name: 'deathMannerId', length: 100 })
  deathMannerId: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @OneToMany(
    () => Deceased,
    deceased => deceased.deathManner
  )
  deceaseds: Deceased[];
}
