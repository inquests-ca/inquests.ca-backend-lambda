import Inquest from '../model/Inquest';
import knex from './knex';

export const getInquestById = (inquestId: number): Promise<Inquest> => {
    return knex
        .first()
        .from('inquest')
        .where({ inquestId });
}

export const getInquests = (keywords, limit, offset): Promise<Array<Inquest>> => {
    const query = knex
        .select('inquest.*')
        .from('inquest');
    if (keywords !== undefined)
        query
            .innerJoin(
                'inquestKeywords',
                'inquest.inquestId',
                'inquestKeywords.inquestId',
            )
            .whereIn(
                'inquestKeywords.keywordId',
                keywords
            )

    query.limit(parseInt(limit) >= 0 ? parseInt(limit) : 10);
    query.offset(parseInt(offset) >= 0 ? parseInt(offset) : 10);

    return query;
}