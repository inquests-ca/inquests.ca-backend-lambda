import express from 'express';
import { getCustomRepository } from 'typeorm';

import { JurisdictionRepository } from '../dao/jurisdiction';

const router = express.Router();

/**
 * Get all jurisdictions, grouped by category (Canada, US, UK, etc.).
 */

router.get('/', async (_req, res) => {
  const jurisdictions = await getCustomRepository(
    JurisdictionRepository
  ).getJurisdictionsByCountry();
  res.json(jurisdictions);
});

export default router;
