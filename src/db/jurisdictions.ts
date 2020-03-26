import Jurisdiction from '../model/Jurisdiction';
import knex from './knex';

export const getJurisdictions = async (): Promise<Jurisdiction> => knex.from('jurisdiction');
