import { getRepository } from 'typeorm';

import { InquestCategory } from '../entity/InquestCategory';
import { AuthorityCategory } from '../entity/AuthorityCategory';

export const getInquestKeywords = async (): Promise<InquestCategory[]> =>
  getRepository(InquestCategory)
    .createQueryBuilder('inquestCategory')
    .innerJoinAndSelect('inquestCategory.inquestKeywords', 'inquestKeywords')
    .getMany();

export const getAuthorityKeywords = async (): Promise<AuthorityCategory[]> =>
  getRepository(AuthorityCategory)
    .createQueryBuilder('authorityCategory')
    .innerJoinAndSelect('authorityCategory.authorityKeywords', 'authorityKeywords')
    .getMany();
