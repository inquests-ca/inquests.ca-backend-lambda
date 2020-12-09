import express from 'express';
import { getCustomRepository } from 'typeorm';

import { JurisdictionCategoryRepository } from '../dao/jurisdictionCategory';

const router = express.Router();

/**
 * Get all jurisdictions, grouped by category (Canada, US, UK, etc.).
 */

router.get('/', async (_req, res) => {
  const jurisdictions = await getCustomRepository(
    JurisdictionCategoryRepository
  ).getJurisdictionsByCategory();
  res.json(jurisdictions);
});

export default router;
