import { Column, Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';

import { Jurisdiction } from './Jurisdiction';

@Entity('jurisdictionCategory')
export class JurisdictionCategory extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  jurisdictionCategoryId!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @OneToMany(() => Jurisdiction, (jurisdiction) => jurisdiction.jurisdictionCategory)
  jurisdictions!: Jurisdiction[];
}
