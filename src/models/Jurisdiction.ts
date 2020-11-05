import { Column, Entity, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { JurisdictionCategory } from './JurisdictionCategory';

@Entity('jurisdiction')
export class Jurisdiction extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  jurisdictionId!: string;

  @Column('char', { length: 100 })
  jurisdictionCategoryId!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('varchar', { length: 255 })
  code!: string;

  @Column('tinyint', { unsigned: true })
  isFederal!: boolean;

  @ManyToOne(() => JurisdictionCategory)
  @JoinColumn({ name: 'jurisdictionCategoryId', referencedColumnName: 'jurisdictionCategoryId' })
  jurisdictionCategory!: JurisdictionCategory;
}
