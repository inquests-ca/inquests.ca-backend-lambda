import knex from './knex';
import { AuthorityKeyword, InquestKeyword } from './models';

export const getInquestKeywords = async (): Promise<Array<InquestKeyword>> =>
  knex.from('inquestKeyword');

export const getAuthorityKeywords = async (): Promise<Array<AuthorityKeyword>> =>
  knex.from('authorityKeyword');
