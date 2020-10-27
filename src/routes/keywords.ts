import express from 'express';

import { getInquestKeywords, getAuthorityKeywords } from '../dao/keywords';

const router = express.Router();

// Get all inquest keywords
router.get('/inquestKeywords', async (_req, res) => {
  const inquestKeywords = await getInquestKeywords();
  res.json(inquestKeywords);
});

// Get all authority keywords
router.get('/authorityKeywords', async (_req, res) => {
  const authorityKeywords = await getAuthorityKeywords();
  res.json(authorityKeywords);
});

export default router;
