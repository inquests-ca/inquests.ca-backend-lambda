import express from 'express';
import { getCustomRepository } from 'typeorm';

import { AuthorityCategoryRepository } from '../dao/authorityCategory';
import { InquestCategoryRepository } from '../dao/inquestCategory';

const router = express.Router();

/**
 * Get all authority keywords, grouped by category.
 */

router.get('/authority', async (_req, res) => {
  const authorityKeywords = await getCustomRepository(
    AuthorityCategoryRepository
  ).getAuthorityKeywordsByCategory();
  res.json(authorityKeywords);
});

/**
 * Get all inquest keywords, grouped by category.
 */

router.get('/inquest', async (_req, res) => {
  const inquestKeywords = await getCustomRepository(
    InquestCategoryRepository
  ).getInquestKeywordsByCategory();
  res.json(inquestKeywords);
});

export default router;
