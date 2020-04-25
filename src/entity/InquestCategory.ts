import { Column, Entity, Index, OneToMany, BaseEntity } from 'typeorm';
import { InquestKeyword } from './InquestKeyword';

@Index('keyword_id_UNIQUE', ['inquestCategoryId'], { unique: true })
@Index('name_UNIQUE', ['name'], { unique: true })
@Entity('inquestCategory', { schema: 'inquestsca' })
export class InquestCategory extends BaseEntity {
  @Column('char', { primary: true, name: 'inquestCategoryId', length: 100 })
  inquestCategoryId: string;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => InquestKeyword,
    inquestKeyword => inquestKeyword.inquestCategory
  )
  inquestKeywords: InquestKeyword[];
}
