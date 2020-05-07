import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('inquestType')
export class InquestType extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  inquestTypeId: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('tinyint', { unsigned: true })
  isMandatory: boolean;
}
