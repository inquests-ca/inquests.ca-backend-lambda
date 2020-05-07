import { Column, Entity, BaseEntity } from 'typeorm';

@Entity('deathManner')
export class DeathManner extends BaseEntity {
  @Column('char', { primary: true, length: 100 })
  deathMannerId: string;

  @Column('varchar', { length: 255 })
  name: string;
}
