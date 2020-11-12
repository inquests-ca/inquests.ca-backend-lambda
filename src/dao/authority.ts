import { EntityRepository, AbstractRepository, Brackets } from 'typeorm';

import { Authority } from '../models/Authority';
import { escapeRegex, getConcatExpression } from '../utils/sql';

@EntityRepository(Authority)
export class AuthorityRepository extends AbstractRepository<Authority> {
  getAuthorityById(authorityId: number): Promise<Authority | undefined> {
    return this.createQueryBuilder('authority')
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
  }

  getAuthorities({
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
  }): Promise<[Authority[], number]> {
    // TODO: create userJurisdiction query parameter, use for ordering results.
    const qb = this.createQueryBuilder('authority');
    const query = qb
      .innerJoinAndSelect(
        'authority.authorityDocuments',
        'primaryDocument',
        'primaryDocument.isPrimary = 1'
      )
      .innerJoinAndSelect('primaryDocument.source', 'source')
      .leftJoin('source.jurisdiction', 'jurisdiction')
      .innerJoin('jurisdiction.jurisdictionCategory', 'jurisdictionCategory')
      .leftJoin('authority.authorityKeywords', 'keywords')
      .leftJoin('authority.authorityTags', 'tags')
      .addSelect("(source.sourceId = 'CAD_SCC')", 'supremeCourt') // Used for ordering
      .addSelect("(jurisdictionCategory.jurisdictionCategoryId = 'CAD')", 'isCanadian') // Used for ordering
      .take(limit)
      .skip(offset)
      .orderBy('authority.isPrimary', 'DESC')
      .addOrderBy('supremeCourt', 'DESC')
      .addOrderBy('isCanadian', 'DESC')
      .addOrderBy('source.rank', 'DESC')
      .addOrderBy('primaryDocument.created', 'DESC');
    if (text)
      text.split(/\s+/).forEach((term, i) => {
        if (term) {
          // Match start of string or non-word character followed by search term.
          const regex = `(^|[^A-Za-z0-9])${escapeRegex(term)}`;
          query.andWhere(
            new Brackets((qb) => {
              qb.where(
                `${getConcatExpression([
                  'authority.name',
                  'primaryDocument.citation',
                ])} REGEXP :regexp${i}`
              )
                .orWhere(`keywords.name REGEXP :regexp${i}`)
                .orWhere(`tags.tag REGEXP :regexp${i}`);
            }),
            { [`regexp${i}`]: regex }
          );
        }
      });
    if (jurisdiction) query.andWhere('source.jurisdiction = :jurisdiction', { jurisdiction });
    if (keywords && keywords.length) {
      // Use sub-query to get list of authorities by ID which match all provided keywords.
      const subQuery = qb
        .subQuery()
        .select('keywords.authorityId')
        .from('authorityKeywords', 'keywords')
        .where('keywords.authorityKeywordId IN (:keywords)', { keywords })
        .groupBy('keywords.authorityId')
        .having('COUNT(keywords.authorityId) >= (:totalKeywords)', {
          totalKeywords: keywords.length,
        })
        .getQuery();
      query.andWhere(`authority.authorityId IN ${subQuery}`);
    }

    return query.getManyAndCount();
  }
}
