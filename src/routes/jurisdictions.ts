import express from 'express';
import { getRepository } from 'typeorm';

import { Jurisdiction } from '../models/Jurisdiction';

const router = express.Router();

/**
 * Get all jurisdictions.
 */

router.get('/', async (_req, res) => {
  const jurisdictions = await getRepository(Jurisdiction).find();
  res.json(jurisdictions);
});

export default router;
