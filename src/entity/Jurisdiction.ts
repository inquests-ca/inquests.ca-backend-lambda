import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';
import { Inquest } from './Inquest';
import { Source } from './Source';

@Entity('jurisdiction', { schema: 'inquestsca' })
export class Jurisdiction extends BaseEntity {
  @Column('char', {
    primary: true,
    name: 'jurisdictionId',
    comment: 'Generally concatenation of sovereignty code and division code (e.g., CAD_ON).',
    length: 100,
  })
  jurisdictionId: string;

  @Column('char', {
    primary: true,
    name: 'jurisdictionCategoryId',
    comment: 'Generally, but not always, a country',
    length: 100,
  })
  jurisdictionCategoryId: string;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment:
      'Generally a province, territory, or state. \nNULL implies this jurisdiction is federal.',
    length: 255,
  })
  name: string | null;

  @Column('tinyint', {
    name: 'federal',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  federal: number | null;

  @OneToMany(
    () => Inquest,
    inquest => inquest.jurisdiction
  )
  inquests: Inquest[];

  @OneToMany(
    () => Source,
    source => source.jurisdiction
  )
  sources: Source[];
}
