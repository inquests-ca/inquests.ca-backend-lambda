import { getRepository } from 'typeorm';

import { Inquest } from '../models/Inquest';
import { escapeRegex } from '../utils/sql';

export const getInquestById = async (inquestId: number): Promise<Inquest> =>
  getRepository(Inquest)
    .createQueryBuilder('inquest')
    .innerJoinAndSelect('inquest.jurisdiction', 'jurisdiction')
    .innerJoinAndSelect('inquest.deceased', 'deceased')
    .innerJoinAndSelect('deceased.deathManner', 'deathManner')
    .innerJoinAndSelect('deceased.inquestType', 'inquestType')
    .innerJoinAndSelect('inquest.inquestDocuments', 'documents')
    .leftJoinAndSelect('documents.inquestDocumentLinks', 'documentLinks')
    .leftJoinAndSelect('documentLinks.documentSource', 'documentSource')
    .leftJoinAndSelect('inquest.authorities', 'authorities')
    .where('inquest.inquestId = :inquestId', { inquestId })
    .getOne();

export const getInquests = async (
  q: string,
  keywords: Set<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<[Inquest[], number]> => {
  // TODO: create userJurisdiction query parameter, use for ordering results.
  const qb = await getRepository(Inquest).createQueryBuilder('inquest');
  const query = qb
    .innerJoinAndSelect('inquest.jurisdiction', 'jurisdiction')
    .innerJoinAndSelect('inquest.deceased', 'deceased')
    .innerJoinAndSelect('deceased.deathManner', 'deathManner')
    .innerJoinAndSelect('deceased.inquestType', 'inquestType')
    .innerJoin('jurisdiction.jurisdictionCategory', 'jurisdictionCategory')
    .addSelect("(jurisdictionCategory.jurisdictionCategoryId = 'CAD')", 'isCanadian') // Used for ordering
    .take(limit)
    .skip(offset)
    .orderBy('inquest.isPrimary', 'DESC')
    .addOrderBy('isCanadian', 'DESC')
    .addOrderBy('inquest.start', 'DESC');
  if (q !== null)
    q.split(/\s+/).forEach((term, i) => {
      if (term)
        query.andWhere(
          `CONCAT(inquest.name, ' ', deceased.lastName, ' ', deceased.givenNames) REGEXP :regexp${i}`,
          {
            // Match start of string or non-word character followed by search term.
            [`regexp${i}`]: `(^|[^A-Za-z0-9])${escapeRegex(term)}`,
          }
        );
    });
  if (jurisdiction !== null)
    query.andWhere('jurisdiction.jurisdictionId = :jurisdiction', { jurisdiction });
  if (keywords !== null) {
    // Use sub-query to get list of inquests by ID which match all provided keywords.
    const subQuery = qb
      .subQuery()
      .select('keywords.inquestId')
      .from('inquestKeywords', 'keywords')
      .where('keywords.inquestKeywordId IN (:keywords)')
      .groupBy('keywords.inquestId')
      .having('COUNT(keywords.inquestId) >= (:totalKeywords)')
      .getQuery();
    query
      .andWhere(`inquest.inquestId IN ${subQuery}`)
      .setParameters({ keywords: Array.from(keywords), totalKeywords: keywords.size });
  }

  return query.getManyAndCount();
};
