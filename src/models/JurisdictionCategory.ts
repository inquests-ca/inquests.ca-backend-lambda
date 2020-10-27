import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('jurisdictionCategory')
export class JurisdictionCategory extends BaseEntity {
  @PrimaryColumn('char', { length: 100 })
  jurisdictionCategoryId: string;

  @Column('varchar', { length: 255 })
  name: string;
}
