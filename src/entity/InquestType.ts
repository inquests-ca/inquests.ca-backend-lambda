import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('inquestType')
export class InquestType extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  inquestTypeId: string;

  @Column('varchar', { nullable: true, length: 255 })
  name: string | null;

  @Column('tinyint', { unsigned: true })
  mandatory: boolean;
}
