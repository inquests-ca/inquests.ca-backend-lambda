import { Column, Entity, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { JurisdictionCategory } from './JurisdictionCategory';

@Entity('jurisdiction')
export class Jurisdiction extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  jurisdictionId: string;

  @Column('char', { primary: true, length: 100 })
  jurisdictionCategoryId: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('tinyint')
  isFederal: boolean;

  @ManyToOne(() => JurisdictionCategory)
  @JoinColumn({ name: 'jurisdictionCategoryId', referencedColumnName: 'jurisdictionCategoryId' })
  jurisdictionCategory: JurisdictionCategory;
}
