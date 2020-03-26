import Inquest from '../model/Inquest';
import knex from './knex';

export const getInquestById = async (inquestId: number): Promise<Inquest> =>
  knex
    .first()
    .from('inquest')
    .where({ inquestId });

export const getInquests = async (
  keywords: Array<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<Array<Inquest>> => {
  const query = knex
    .select('inquest.*')
    .from('inquest')
    .groupBy('inquest.inquestID')
    .limit(limit)
    .offset(offset);
  if (keywords !== undefined)
    query
      .innerJoin('inquestKeywords', 'inquest.inquestId', 'inquestKeywords.inquestId')
      .whereIn('inquestKeywords.inquestKeywordId', keywords);
  if (jurisdiction !== undefined)
    query
      .innerJoin('source', 'inquest.sourceID', 'source.sourceID')
      .where('source.jurisdictionID', jurisdiction);

  return query;
};
