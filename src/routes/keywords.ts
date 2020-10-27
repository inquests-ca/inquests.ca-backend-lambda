import express from 'express';
import { getCustomRepository } from 'typeorm';

import { AuthorityCategoryRepository } from '../dao/authorityCategory';
import { InquestCategoryRepository } from '../dao/inquestCategory';

const router = express.Router();

// Get all authority keywords, grouped by category.
router.get('/authorityKeywords', async (_req, res) => {
  const authorityKeywords = await getCustomRepository(
    AuthorityCategoryRepository
  ).getAuthorityKeywords();
  res.json(authorityKeywords);
});

// Get all inquest keywords, grouped by category.
router.get('/inquestKeywords', async (_req, res) => {
  const inquestKeywords = await getCustomRepository(InquestCategoryRepository).getInquestKeywords();
  res.json(inquestKeywords);
});

export default router;
