import { EntityRepository, AbstractRepository } from 'typeorm';

import { Inquest } from '../models/Inquest';
import { escapeRegex } from '../utils/sql';

@EntityRepository(Inquest)
export class InquestRepository extends AbstractRepository<Inquest> {
  getInquestById(inquestId: number): Promise<Inquest | undefined> {
    return this.createQueryBuilder('inquest')
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
  }

  getInquests({
    offset,
    limit,
    text,
    keywords,
    jurisdiction,
  }: {
    offset: number;
    limit: number;
    text?: string;
    keywords?: string[];
    jurisdiction?: string;
  }): Promise<[Inquest[], number]> {
    // TODO: create userJurisdiction query parameter, use for ordering results.
    const qb = this.createQueryBuilder('inquest');
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
    if (text)
      text.split(/\s+/).forEach((term, i) => {
        if (term)
          query.andWhere(
            `CONCAT(inquest.name, ' ', deceased.lastName, ' ', deceased.givenNames) REGEXP :regexp${i}`,
            {
              // Match start of string or non-word character followed by search term.
              [`regexp${i}`]: `(^|[^A-Za-z0-9])${escapeRegex(term)}`,
            }
          );
      });
    if (jurisdiction)
      query.andWhere('jurisdiction.jurisdictionId = :jurisdiction', { jurisdiction });
    if (keywords && keywords.length) {
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
        .setParameters({ keywords: Array.from(keywords), totalKeywords: keywords.length });
    }

    return query.getManyAndCount();
  }
}
