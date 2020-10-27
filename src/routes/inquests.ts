import express from 'express';
import { getCustomRepository } from 'typeorm';

import { InquestRepository } from '../dao/inquest';
import { PAGINATION } from '../constants';

const router = express.Router();

// Get inquest by ID
router.get('/:inquestId(\\d+)', async (req, res) => {
  const { inquestId } = req.params;
  const inquest = await getCustomRepository(InquestRepository).getInquestById(parseInt(inquestId));
  if (inquest === undefined) res.status(404).send('Inquest not found');
  else res.json(inquest);
});

// Get all inquests, with optional search parameters and pagination
// e.g.: /inquests?q=Smith&keywords=CAUSE_CRUSH&limit=50&offset=100&jurisdiction=CAD_ON
router.get('/', async (req, res) => {
  const {
    // Search
    text,

    // Filtering
    keywords,
    jurisdiction,

    // Pagination
    offset,
    limit,

    // Ordering... TODO
  } = req.query;

  const textParsed = (text as string) || null;
  const keywordsParsed = keywords ? new Set<string>((keywords as string).split('__')) : null;
  const jurisdictionParsed = (jurisdiction as string) || null;
  const limitParsed = parseInt(limit as string) >= 0 ? parseInt(limit as string) : PAGINATION;
  const offsetParsed = parseInt(offset as string) >= 0 ? parseInt(offset as string) : 0;
  const [data, count] = await getCustomRepository(InquestRepository).getInquests(
    textParsed,
    keywordsParsed,
    jurisdictionParsed,
    limitParsed,
    offsetParsed
  );
  res.json({ data, count });
});

export default router;
