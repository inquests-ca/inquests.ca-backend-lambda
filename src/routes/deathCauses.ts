import express from 'express';
import { getRepository } from 'typeorm';

import { DeathCause } from '../models/DeathCause';

const router = express.Router();

/**
 * Get all causes of death.
 */

router.get('/', async (_req, res) => {
  const deathCauses = await getRepository(DeathCause).find();
  res.json(deathCauses);
});

export default router;
