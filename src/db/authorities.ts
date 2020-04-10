import Authority from '../model/Authority';
import knex from './knex';

export const getAuthorityById = async (authorityID: number): Promise<Authority> =>
  knex
    .first()
    .from('authority')
    .where({ authorityID });

export const getAuthorities = async (
  keywords: Array<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<Array<Authority>> => {
  const query = knex
    .select('authority.*')
    .from('authority')
    .groupBy('authority.authorityID')
    .limit(limit)
    .offset(offset)
    .orderBy('primary', 'desc');
  if (keywords !== undefined)
    // TODO: should be AND instead of OR.
    query
      .innerJoin('authorityKeywords', 'authority.authorityId', 'authorityKeywords.authorityId')
      .whereIn('authorityKeywords.authorityKeywordId', keywords);
  if (jurisdiction !== undefined)
    // TODO: only use highest ranking source.
    query
      .innerJoin('authorityDocuments', 'authority.authorityId', 'authorityDocuments.authorityId')
      .innerJoin('source', 'authorityDocuments.sourceID', 'source.sourceID')
      .where('source.jurisdictionID', jurisdiction);

  return query;
};
