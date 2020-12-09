import { EntityRepository, AbstractRepository } from 'typeorm';

import { Jurisdiction } from '../models/Jurisdiction';

@EntityRepository(Jurisdiction)
export class JurisdictionRepository extends AbstractRepository<Jurisdiction> {
  getJurisdictionsByCountry(): Promise<Jurisdiction[]> {
    return this.createQueryBuilder('jurisdiction')
      .where('jurisdiction.federalJurisdictionId IS NULL') // Get federal jurisdictions (countries).
      .leftJoinAndSelect('jurisdiction.jurisdictions', 'jurisdictions')
      .getMany();
  }
}
