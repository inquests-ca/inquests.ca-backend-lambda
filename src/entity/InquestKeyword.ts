import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, BaseEntity } from 'typeorm';
import { InquestCategory } from './InquestCategory';
import { Inquest } from './Inquest';

@Index('keyword_id_UNIQUE', ['inquestKeywordId'], { unique: true })
@Index('name_UNIQUE', ['name'], { unique: true })
@Index('fk_inquestCategoryId_inquestKeyword1_idx', ['inquestCategoryId'], {})
@Entity('inquestKeyword', { schema: 'inquestsca' })
export class InquestKeyword extends BaseEntity {
  @Column('char', { primary: true, name: 'inquestKeywordId', length: 100 })
  inquestKeywordId: string;

  @Column('char', { name: 'inquestCategoryId', nullable: true, length: 100 })
  inquestCategoryId: string | null;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(
    () => InquestCategory,
    inquestCategory => inquestCategory.inquestKeywords,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'inquestCategoryId', referencedColumnName: 'inquestCategoryId' }])
  inquestCategory: InquestCategory;

  @ManyToMany(
    () => Inquest,
    inquest => inquest.inquestKeywords
  )
  inquests: Inquest[];
}
