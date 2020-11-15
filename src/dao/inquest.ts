import { EntityRepository, AbstractRepository } from 'typeorm';

import { Inquest } from '../models/Inquest';
import { escapeRegex, getConcatExpression } from '../utils/sql';

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
      .leftJoin('inquest.inquestKeywords', 'keywords')
      .leftJoin('inquest.inquestTags', 'tags')
      .addSelect("(jurisdictionCategory.jurisdictionCategoryId = 'CAD')", 'isCanadian') // Used for ordering
      .take(limit)
      .skip(offset)
      .orderBy('inquest.isPrimary', 'DESC')
      .addOrderBy('isCanadian', 'DESC')
      .addOrderBy('inquest.start', 'DESC');
    if (text) {
      const terms = text.split(/\s+/).filter((term) => term);
      if (terms.length) {
        const searchTextSubQuery = qb
          .subQuery()
          .addSelect('inquest.inquestId')
          .addSelect('inquest.name')
          .addSelect('deceased.lastName')
          .addSelect('deceased.givenNames')
          .from('inquest', 'inquest')
          .innerJoin('inquest.deceased', 'deceased')
          .leftJoin('inquest.inquestKeywords', 'keywords')
          .leftJoin('inquest.inquestTags', 'tags')
          .addGroupBy('inquest.inquestId')
          .addGroupBy('deceased.deceasedId');
        terms.forEach((term, i) => {
          // For each search term, ensure at least 1 of several columns contains that term.
          // Match the start of the string or a non-word character followed by each search term.
          const regex = `(^|[^A-Za-z0-9])${escapeRegex(term)}`;
          searchTextSubQuery.andHaving(
            `${getConcatExpression([
              'inquest.name',
              'deceased.lastName',
              'deceased.givenNames',
              "GROUP_CONCAT(keywords.name SEPARATOR ' ')",
              "GROUP_CONCAT(tags.tag SEPARATOR ' ')",
            ])} REGEXP :regexp${i}`,
            { [`regexp${i}`]: regex }
          );
        });
        // Extract inquest IDs from previous sub-query.
        const inquestIdSubQuery = qb
          .subQuery()
          .select('inquest_inquestId')
          .from(searchTextSubQuery.getQuery(), 'searchTextSubQuery');
        query.andWhere(`inquest.inquestId IN ${inquestIdSubQuery.getQuery()}`);
      }
    }
    if (jurisdiction)
      query.andWhere('jurisdiction.jurisdictionId = :jurisdiction', { jurisdiction });
    if (keywords && keywords.length) {
      // Use sub-query to get list of inquests by ID which match all provided keywords.
      const subQuery = qb
        .subQuery()
        .select('keywords.inquestId')
        .from('inquestKeywords', 'keywords')
        .where('keywords.inquestKeywordId IN (:keywords)', { keywords })
        .groupBy('keywords.inquestId')
        .having('COUNT(keywords.inquestId) >= (:totalKeywords)', { totalKeywords: keywords.length })
        .getQuery();
      query.andWhere(`inquest.inquestId IN ${subQuery}`);
    }

    return query.getManyAndCount();
  }
}
