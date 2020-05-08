import { getConnection } from '../utils/db';
import { InquestCategory } from '../entity/InquestCategory';
import { AuthorityCategory } from '../entity/AuthorityCategory';

export const getInquestKeywords = async (): Promise<InquestCategory[]> => {
  const connection = await getConnection();
  return connection
    .getRepository(InquestCategory)
    .createQueryBuilder('inquestCategory')
    .innerJoinAndSelect('inquestCategory.inquestKeywords', 'inquestKeywords')
    .getMany();
};

export const getAuthorityKeywords = async (): Promise<AuthorityCategory[]> => {
  const connection = await getConnection();
  return connection
    .getRepository(AuthorityCategory)
    .createQueryBuilder('authorityCategory')
    .innerJoinAndSelect('authorityCategory.authorityKeywords', 'authorityKeywords')
    .getMany();
};
