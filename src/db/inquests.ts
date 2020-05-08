import { getConnection } from '../utils/db';
import { Inquest } from '../entity/Inquest';

export const getInquestById = async (inquestId: number): Promise<Inquest> => {
  const connection = await getConnection();
  return connection
    .getRepository(Inquest)
    .createQueryBuilder('inquest')
    .innerJoinAndSelect('inquest.jurisdiction', 'jurisdiction')
    .innerJoinAndSelect('inquest.deceased', 'deceased')
    .innerJoinAndSelect('deceased.deathManner', 'deathManner')
    .innerJoinAndSelect('deceased.inquestType', 'inquestType')
    .innerJoinAndSelect('inquest.inquestDocuments', 'documents')
    .innerJoinAndSelect('documents.inquestDocumentLinks', 'documentLinks')
    .innerJoinAndSelect('documentLinks.documentSource', 'documentSource')
    .leftJoinAndSelect('inquest.authorities', 'authorities')
    .where('inquest.inquestId = :inquestId', { inquestId })
    .getOne();
};

export const getInquests = async (
  q: string,
  keywords: Set<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<[Inquest[], number]> => {
  // TODO: create userJurisdiction query parameter, use for ordering results.
  const connection = await getConnection();
  const qb = await connection.getRepository(Inquest).createQueryBuilder('inquest');
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
    query
      .andWhere('MATCH (deceased.lastName, deceased.givenNames) AGAINST (:q)', { q })
      .andWhere('MATCH (inquest.name) AGAINST (:q)', { q });
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
      .andWhere('inquest.inquestId IN ' + subQuery)
      .setParameters({ keywords: Array.from(keywords), totalKeywords: keywords.size });
  }

  return query.getManyAndCount();
};
