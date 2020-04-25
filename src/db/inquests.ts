// TODO: prune and clean up models.
import { getRepository } from 'typeorm';

import { Inquest } from '../entity/Inquest';

export const getInquestById = async (inquestId: number): Promise<Inquest> =>
  getRepository(Inquest)
    .createQueryBuilder('inquest')
    .innerJoinAndSelect('inquest.jurisdiction', 'jurisdiction')
    .innerJoinAndSelect('inquest.deceased', 'deceased')
    .innerJoinAndSelect('deceased.deathManner', 'deathManner')
    .innerJoinAndSelect('deceased.inquestType', 'inquestType')
    .innerJoinAndSelect('inquest.inquestDocuments', 'documents')
    .innerJoinAndSelect('documents.documentSource', 'documentSource')
    .where('inquest.inquestId = :inquestId', { inquestId })
    .getOne();

export const getInquests = async (
  keywords: Array<string>,
  jurisdiction: string,
  limit: number,
  offset: number
): Promise<Inquest[]> => {
  const query = getRepository(Inquest)
    .createQueryBuilder('inquest')
    .innerJoinAndSelect('inquest.jurisdiction', 'jurisdiction')
    .take(limit)
    .skip(offset)
    .orderBy('inquest.primary', 'DESC')
    .orderBy('inquest.start', 'DESC');
  if (jurisdiction !== undefined)
    query.where('jurisdiction.jurisdictionId = :jurisdiction', { jurisdiction });
  if (keywords !== undefined)
    query.innerJoin(
      'inquest.inquestKeywords',
      'keywords',
      'keywords.inquestKeywordId IN (:keywords)',
      { keywords }
    );

  return query.getMany();
};
