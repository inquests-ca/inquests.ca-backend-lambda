import { getRepository } from 'typeorm';

import { InquestCategory } from '../models/InquestCategory';
import { AuthorityCategory } from '../models/AuthorityCategory';

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
