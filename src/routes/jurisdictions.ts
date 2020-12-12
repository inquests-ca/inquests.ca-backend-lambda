import express from 'express';
import { getCustomRepository } from 'typeorm';

import { JurisdictionRepository } from '../dao/jurisdiction';

const router = express.Router();

/**
 * Get all jurisdictions.
 */

router.get('/', async (_req, res) => {
  const jurisdictions = await getCustomRepository(JurisdictionRepository).getJurisdictions();
  res.json(jurisdictions);
});

export default router;
