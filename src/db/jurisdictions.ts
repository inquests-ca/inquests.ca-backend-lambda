import { getRepository } from 'typeorm';

import { Jurisdiction } from '../entity/Jurisdiction';

export const getJurisdictions = async (): Promise<Jurisdiction[]> =>
  getRepository(Jurisdiction).find();
