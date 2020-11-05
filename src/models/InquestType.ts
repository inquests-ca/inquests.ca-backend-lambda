import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('inquestType')
export class InquestType extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  inquestTypeId!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('tinyint', { unsigned: true })
  isMandatory!: boolean;
}
