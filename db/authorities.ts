import Authority from '../model/Authority';
import knex from './knex';

export const getAuthorityById = async (authorityID: number): Promise<Authority> =>
  knex
    .first()
    .from('authority')
    .where({ authorityID });

export const getAuthorities = async (
  keywords: Array<string>,
  limit: number,
  offset: number
): Promise<Array<Authority>> => {
  const query = knex
    .select('authority.*')
    .from('authority')
    .groupBy('authority.authorityID')
    .limit(limit)
    .offset(offset);
  if (keywords !== undefined)
    query
      .innerJoin('authorityKeywords', 'authority.authorityId', 'authorityKeywords.authorityId')
      .whereIn('authorityKeywords.authorityKeywordId', keywords);

  return query;
};
