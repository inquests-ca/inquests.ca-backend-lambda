import Inquest from '../model/Inquest';
import knex from './knex';

export const getInquestById = (inquestId: number): Promise<Inquest> => {
    return knex
        .first()
        .from('inquest')
        .where({ inquestId });
}

export const getInquests = (keywords: Array<String>, limit: number, offset: number): Promise<Array<Inquest>> => {
    const query = knex
        .select('inquest.*')
        .from('inquest')
        .limit(limit)
        .offset(offset);
    if (keywords !== undefined)
        query
            .innerJoin(
                'inquestKeywords',
                'inquest.inquestId',
                'inquestKeywords.inquestId',
            )
            .whereIn(
                'inquestKeywords.inquestKeywordId',
                keywords
            );

    return query;
}
