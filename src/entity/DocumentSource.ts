import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('documentSource')
export class DocumentSource extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  documentSourceId: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('tinyint')
  isFree: boolean;
}
