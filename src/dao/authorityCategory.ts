import { EntityRepository, AbstractRepository } from 'typeorm';

import { AuthorityCategory } from '../models/AuthorityCategory';

@EntityRepository(AuthorityCategory)
export class AuthorityCategoryRepository extends AbstractRepository<AuthorityCategory> {
  getAuthorityKeywords(): Promise<AuthorityCategory[]> {
    return this.createQueryBuilder('authorityCategory')
      .innerJoinAndSelect('authorityCategory.authorityKeywords', 'authorityKeywords')
      .getMany();
  }
}
