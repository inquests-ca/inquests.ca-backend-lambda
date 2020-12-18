import express from 'express';
import { getRepository } from 'typeorm';

import { AuthorityCategory } from '../models/AuthorityCategory';
import { InquestCategory } from '../models/InquestCategory';

const router = express.Router();

/**
 * Get all authority keywords, grouped by category.
 */

router.get('/authority', async (_req, res) => {
  const authorityKeywords = await getRepository(AuthorityCategory).find({
    relations: ['authorityKeywords'],
  });
  res.json(authorityKeywords);
});

/**
 * Get all inquest keywords, grouped by category.
 */

router.get('/inquest', async (_req, res) => {
  const inquestKeywords = await getRepository(InquestCategory).find({
    relations: ['inquestKeywords'],
  });
  res.json(inquestKeywords);
});

export default router;
