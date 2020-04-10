import { Jurisdiction } from './models';
import knex from './knex';

export const getJurisdictions = async (): Promise<Jurisdiction> => knex.from('jurisdiction');
