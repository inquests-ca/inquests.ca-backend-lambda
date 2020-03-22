import knex from './knex';
import InquestKeyword from '../model/InquestKeyword';
import AuthorityKeyword from '../model/AuthorityKeyword';

export const getInquestKeywords = async (): Promise<Array<InquestKeyword>> =>
  knex.from('inquestKeyword');

export const getAuthorityKeywords = async (): Promise<Array<AuthorityKeyword>> =>
  knex.from('authorityKeyword');
