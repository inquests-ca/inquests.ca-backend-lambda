import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('jurisdiction_category')
export class JurisdictionCategory extends BaseEntity {
  @Column('varchar', { primary: true, length: 255 })
  jurisdictionCategoryId: string;

  @Column('varchar', { length: 255 })
  name: string;
}
