import { EntityRepository, AbstractRepository } from 'typeorm';

import { JurisdictionCategory } from '../models/JurisdictionCategory';

@EntityRepository(JurisdictionCategory)
export class JurisdictionCategoryRepository extends AbstractRepository<JurisdictionCategory> {
  getJurisdictionsByCategory(): Promise<JurisdictionCategory[]> {
    return this.createQueryBuilder('jurisdictionCategory')
      .innerJoinAndSelect('jurisdictionCategory.jurisdictions', 'jurisdictions')
      .getMany();
  }
}
