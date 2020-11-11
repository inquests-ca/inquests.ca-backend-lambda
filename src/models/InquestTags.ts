import { JoinColumn, Entity, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';
import { Inquest } from './Inquest';

@Entity('inquestTags')
export class InquestTags extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  inquestId!: number;

  @PrimaryColumn('varchar', { length: 255 })
  tag!: string;

  @ManyToOne(() => Inquest, (inquest) => inquest.inquestTags)
  @JoinColumn({ name: 'inquestId', referencedColumnName: 'inquestId' })
  inquest!: Inquest;
}
