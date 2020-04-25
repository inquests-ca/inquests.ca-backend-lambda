import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('jurisdiction_category', { schema: 'inquestsca' })
export class JurisdictionCategory extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'jurisdictionCategoryId',
    length: 255,
  })
  jurisdictionCategoryId: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;
}
