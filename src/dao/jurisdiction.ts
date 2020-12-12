import { EntityRepository, AbstractRepository } from 'typeorm';

import { Jurisdiction } from '../models/Jurisdiction';

@EntityRepository(Jurisdiction)
export class JurisdictionRepository extends AbstractRepository<Jurisdiction> {
  getJurisdictions(): Promise<Jurisdiction[]> {
    return this.createQueryBuilder('jurisdiction').getMany();
  }
}
