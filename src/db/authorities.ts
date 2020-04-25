import { getRepository } from 'typeorm';

import { Authority } from '../entity/Authority';

// TODO: use leftJoin where appropriate.
export const getAuthorityById = async (authorityId: number): Promise<Authority> =>
  // TODO: authority document type.
  // TODO: use innerJoinAndMapOne where appropriate.
  getRepository(Authority)
    .createQueryBuilder('authority')
    .innerJoinAndSelect('authority.authorityDocuments', 'documents')
    .innerJoinAndSelect('documents.source', 'source')
    .innerJoinAndSelect('documents.authorityDocumentLinks', 'documentLinks')
    .innerJoinAndSelect('documentLinks.documentSource', 'documentSource')
    .where('authority.authorityId = :authorityId', { authorityId })
    .getOne();

export const getAuthorities = async (
  keywords: Array<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<Array<Authority>> => {
  const query = await getRepository(Authority)
    .createQueryBuilder('authority')
    .innerJoinAndSelect(
      'authority.authorityDocuments',
      'primaryDocument',
      'primaryDocument.primary = 1'
    )
    .innerJoinAndSelect('primaryDocument.source', 'source')
    .take(limit)
    .skip(offset)
    .orderBy('authority.primary', 'DESC')
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
