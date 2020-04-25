import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { Deceased } from './Deceased';

@Index('deathMannerId_UNIQUE', ['inquestTypeId'], { unique: true })
@Entity('inquestType', { schema: 'inquestsca' })
export class InquestType extends BaseEntity {
  @Column('char', { primary: true, name: 'inquestTypeId', length: 100 })
  inquestTypeId: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('tinyint', { name: 'mandatory', unsigned: true })
  mandatory: number;

  @OneToMany(
    () => Deceased,
    deceased => deceased.inquestType
  )
  deceaseds: Deceased[];
}
