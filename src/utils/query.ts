import joi from 'joi';

export enum Sort {
  Relevant = 'relevant',
  New = 'new',
  Alphabetical = 'a-z',
}

interface BaseQuery {
  offset: number;
  limit: number;
  text?: string;
  keywords?: string[];
  jurisdiction?: string;
  sort?: Sort;
}

const baseQuerySchema = joi.object<BaseQuery>({
  offset: joi.number().integer().min(0).default(0),
  limit: joi.number().integer().positive().max(2000).default(100),
  text: joi.string(),
  keywords: joi.array(),
  jurisdiction: joi.string(),
  sort: joi.string().valid(...Object.values(Sort)),
});

export type AuthorityQuery = BaseQuery;
export const authorityQuerySchema = baseQuerySchema;

export interface InquestQuery extends BaseQuery {
  deathCause: string;
}
export const inquestQuerySchema = (baseQuerySchema as joi.ObjectSchema<InquestQuery>).keys({
  deathCause: joi.string(),
});
