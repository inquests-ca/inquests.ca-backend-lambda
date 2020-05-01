import * as _ from 'lodash';
import { getRepository } from 'typeorm';

import { Authority } from '../entity/Authority';

// TODO: use leftJoin where appropriate.
export const getAuthorityById = async (authorityId: number): Promise<Authority> => {
  // TODO: authority document type.
  // TODO: use innerJoinAndMapOne where appropriate.
  const authority = await getRepository(Authority)
    .createQueryBuilder('authority')
    .innerJoinAndSelect('authority.authorityDocuments', 'documents')
    .innerJoinAndSelect('documents.source', 'source')
    .innerJoinAndSelect('documents.authorityDocumentLinks', 'documentLinks')
    .innerJoinAndSelect('documentLinks.documentSource', 'documentSource')
    .leftJoinAndSelect('authority.authorityCitations', 'authorityCitations')
    .leftJoinAndSelect('authority.authorityCitedBy', 'authorityCitedBy')
    .leftJoinAndSelect('authority.authorityRelated', 'authorityRelated')
    .leftJoinAndSelect('authority.authorityRelatedDup', 'authorityRelatedDup')
    .leftJoinAndSelect('authority.authoritySuperceded', 'authoritySuperceded')
    .leftJoinAndSelect('authority.authoritySupercededBy', 'authoritySupercededBy')
    .leftJoinAndSelect('authority.inquests', 'inquests')
    .where('authority.authorityId = :authorityId', { authorityId })
    .getOne();

  // Combine authorityRelated and authorityRelatedDup fields (since authority relationships are undirected).
  authority.authorityRelated = authority.authorityRelated.concat(authority.authorityRelatedDup);

  // If we remove the field from the model, then authority will not be of type Authority. Instead we set it to null.
  // TODO: better solution.
  authority.authorityRelatedDup = null;

  // Remove duplicates.
  // TODO: this should be handled at the data layer rather than in the backend.
  authority.authorityRelated = _.uniqBy(
    authority.authorityRelated,
    authority => authority.authorityId
  );

  return authority;
};

export const getAuthorities = async (
  keywords: Array<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<Array<Authority>> => {
  // TODO: consider using source ranking (e.g., rank > 89) rather than hardcoding check for SCC.
  const query = await getRepository(Authority)
    .createQueryBuilder('authority')
    .innerJoinAndSelect(
      'authority.authorityDocuments',
      'primaryDocument',
      'primaryDocument.primary = 1'
    )
    .innerJoinAndSelect('primaryDocument.source', 'source')
    .innerJoin('source.jurisdiction', 'jurisdiction')
    .innerJoin('jurisdiction.jurisdictionCategory', 'jurisdictionCategory')
    .addSelect("(source.sourceId = 'CAD_SCC')", 'supremeCourt') // Used in ORDER BY clause
    .addSelect("(source.jurisdictionId = 'CAD_ON')", 'userJurisdiction') // Used in ORDER BY clause
    .addSelect("(jurisdictionCategory.jurisdictionCategoryId = 'CAD')", 'userCountry') // Used in ORDER BY clause
    .take(limit)
    .skip(offset)
    .orderBy('supremeCourt', 'DESC')
    .addOrderBy('authority.primary', 'DESC')
    .addOrderBy('userJurisdiction', 'DESC')
    .addOrderBy('userCountry', 'DESC')
    .addOrderBy('source.rank', 'DESC')
    .addOrderBy('primaryDocument.created', 'DESC');
  if (keywords !== undefined)
    query.innerJoin(
      'authority.authorityKeywords',
      'keywords',
      'keywords.authorityKeywordId IN (:keywords)',
      { keywords }
    );
  if (jurisdiction !== undefined)
    query.where('source.jurisdiction = :jurisdiction', { jurisdiction });

  return query.getMany();
};
