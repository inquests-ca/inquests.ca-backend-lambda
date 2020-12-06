import { EntityRepository, AbstractRepository, SelectQueryBuilder } from 'typeorm';

import { Authority } from '../models/Authority';
import { escapeRegex, getConcatExpression } from '../utils/sql';
import { AuthoritySort } from '../constants';

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
    sort,
  }: {
    offset: number;
    limit: number;
    text?: string;
    keywords?: string[];
    jurisdiction?: string;
    sort?: AuthoritySort;
  }): Promise<[Authority[], number]> {
    // TODO: create userJurisdiction query parameter, use for ordering results.
    const query = this.createQueryBuilder('authority')
      .innerJoinAndSelect(
        'authority.authorityDocuments',
        'primaryDocument',
        'primaryDocument.isPrimary = 1'
      )
      .innerJoinAndSelect('primaryDocument.source', 'source')
      .leftJoin('source.jurisdiction', 'jurisdiction')
      .innerJoin('jurisdiction.jurisdictionCategory', 'jurisdictionCategory')
      .take(limit)
      .skip(offset);

    if (text) this.addTextSearch(query, text);
    if (keywords && keywords.length) this.addKeywordSearch(query, keywords);
    if (jurisdiction) query.andWhere('source.jurisdiction = :jurisdiction', { jurisdiction });
    if (sort) this.addSort(query, sort);

    return query.getManyAndCount();
  }

  private addTextSearch(query: SelectQueryBuilder<Authority>, text: string) {
    const terms = text.split(/\s+/).filter((term) => term);
    if (terms.length) {
      const searchTextSubQuery = query
        .subQuery()
        .addSelect('authority.authorityId')
        .addSelect('authority.name')
        .addSelect('primaryDocument.citation')
        .from('authority', 'authority')
        .innerJoin(
          'authority.authorityDocuments',
          'primaryDocument',
          'primaryDocument.isPrimary = 1'
        )
        .leftJoin('authority.authorityKeywords', 'keywords')
        .leftJoin('authority.authorityTags', 'tags')
        .addGroupBy('authority.authorityId')
        .addGroupBy('primaryDocument.authorityDocumentId');
      terms.forEach((term, i) => {
        // For each search term, ensure at least 1 of several columns contains that term.
        // Match the start of the string or a non-word character followed by the search term.
        const regex = `(^|[^A-Za-z0-9])${escapeRegex(term)}`;
        searchTextSubQuery.andHaving(
          `${getConcatExpression([
            'authority.name',
            'primaryDocument.citation',
            "GROUP_CONCAT(keywords.name SEPARATOR ' ')",
            "GROUP_CONCAT(tags.tag SEPARATOR ' ')",
          ])} REGEXP :regexp${i}`,
          { [`regexp${i}`]: regex }
        );
      });
      // Extract authority IDs from previous sub-query.
      const authorityIdSubQuery = query
        .subQuery()
        .select('authority_authorityId')
        .from(searchTextSubQuery.getQuery(), 'searchTextSubQuery');
      query.andWhere(`authority.authorityId IN ${authorityIdSubQuery.getQuery()}`);
    }
  }

  private addKeywordSearch(query: SelectQueryBuilder<Authority>, keywords: string[]) {
    // Use sub-query to get list of authorities by ID which match all provided keywords.
    const subQuery = query
      .subQuery()
      .select('keywords.authorityId')
      .from('authorityKeywords', 'keywords')
      .where('keywords.authorityKeywordId IN (:keywords)', { keywords })
      .groupBy('keywords.authorityId')
      .having('COUNT(keywords.authorityId) >= (:totalKeywords)', {
        totalKeywords: keywords.length,
      });
    query.andWhere(`authority.authorityId IN ${subQuery.getQuery()}`);
  }

  private addSort(query: SelectQueryBuilder<Authority>, sort: AuthoritySort) {
    switch (sort) {
      case AuthoritySort.Alphabetical:
        query.addOrderBy('authority.name', 'ASC');
        break;
      case AuthoritySort.Date:
        query.addOrderBy('primaryDocument.created', 'DESC');
        break;
      case AuthoritySort.Relevance:
        query
          .addOrderBy('authority.isPrimary', 'DESC')
          .addOrderBy('source.rank', 'DESC')
          .addOrderBy('primaryDocument.created', 'DESC');
        break;
    }
  }
}
