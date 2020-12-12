import { EntityRepository, AbstractRepository } from 'typeorm';

import { InquestCategory } from '../models/InquestCategory';

@EntityRepository(InquestCategory)
export class InquestCategoryRepository extends AbstractRepository<InquestCategory> {
  getInquestKeywordsByCategory(): Promise<InquestCategory[]> {
    return this.createQueryBuilder('inquestCategory')
      .innerJoinAndSelect('inquestCategory.inquestKeywords', 'inquestKeywords')
      .getMany();
  }
}
