import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('jurisdictionCategory')
export class JurisdictionCategory extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  jurisdictionCategoryId: string;

  @Column('varchar', { length: 255 })
  name: string;
}
