import { getRepository } from 'typeorm';

import { Authority } from '../entity/Authority';
import { escapeRegex } from '../utils/sql';

export const getAuthorityById = async (authorityId: number): Promise<Authority> =>
  // TODO: authority document type.
  // TODO: use innerJoinAndMapOne where appropriate.
  getRepository(Authority)
    .createQueryBuilder('authority')
    .innerJoinAndSelect('authority.authorityDocuments', 'documents')
    .innerJoinAndSelect('documents.source', 'source')
    .leftJoinAndSelect('documents.authorityDocumentLinks', 'documentLinks')
    .leftJoinAndSelect('documentLinks.documentSource', 'documentSource')
    .leftJoinAndSelect('authority.authorityCitations', 'authorityCitations')
    .leftJoinAndSelect('authority.authorityCitedBy', 'authorityCitedBy')
    .leftJoinAndSelect('authority.authorityRelated', 'authorityRelated')
    .leftJoinAndSelect('authority.authoritySuperceded', 'authoritySuperceded')
    .leftJoinAndSelect('authority.authoritySupercededBy', 'authoritySupercededBy')
    .leftJoinAndSelect('authority.inquests', 'inquests')
    .where('authority.authorityId = :authorityId', { authorityId })
    .getOne();

export const getAuthorities = async (
  q: string | null,
  keywords: Set<string> | null,
  jurisdiction: string | null,
  limit: number,
  offset: number
): Promise<[Authority[], number]> => {
  // TODO: create userJurisdiction query parameter, use for ordering results.
  const qb = await getRepository(Authority).createQueryBuilder('authority');
  const query = qb
    .innerJoinAndSelect(
      'authority.authorityDocuments',
      'primaryDocument',
      'primaryDocument.isPrimary = 1'
    )
    .innerJoinAndSelect('primaryDocument.source', 'source')
    .leftJoin('source.jurisdiction', 'jurisdiction')
    .innerJoin('jurisdiction.jurisdictionCategory', 'jurisdictionCategory')
    .addSelect("(source.sourceId = 'CAD_SCC')", 'supremeCourt') // Used for ordering
    .addSelect("(jurisdictionCategory.jurisdictionCategoryId = 'CAD')", 'isCanadian') // Used for ordering
    .take(limit)
    .skip(offset)
    .orderBy('authority.isPrimary', 'DESC')
    .addOrderBy('supremeCourt', 'DESC')
    .addOrderBy('isCanadian', 'DESC')
    .addOrderBy('source.rank', 'DESC')
    .addOrderBy('primaryDocument.created', 'DESC');
  if (q !== null)
    q.split(' ').forEach((term, i) => {
      if (term)
        query.andWhere(`CONCAT(authority.name, ' ', primaryDocument.citation) REGEXP :regexp${i}`, {
          // Match start of string or non-word character followed by search term.
          [`regexp${i}`]: `(^|[^a-zA-Z])${escapeRegex(term)}`
        });
    });
  if (jurisdiction !== null)
    query.andWhere('source.jurisdiction = :jurisdiction', { jurisdiction });
  if (keywords !== null) {
    // Use sub-query to get list of authorities by ID which match all provided keywords.
    const subQuery = qb
      .subQuery()
      .select('keywords.authorityId')
      .from('authorityKeywords', 'keywords')
      .where('keywords.authorityKeywordId IN (:keywords)')
      .groupBy('keywords.authorityId')
      .having('COUNT(keywords.authorityId) >= (:totalKeywords)')
      .getQuery();
    query
      .andWhere(`authority.authorityId IN ${subQuery}`)
      .setParameters({ keywords: Array.from(keywords), totalKeywords: keywords.size });
  }

  return query.getManyAndCount();
};
