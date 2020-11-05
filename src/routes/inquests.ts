import express from 'express';
import joi from 'joi';
import { getCustomRepository } from 'typeorm';

import { InquestRepository } from '../dao/inquest';
import { PAGINATION } from '../constants';

const router = express.Router();

/**
 * Get inquest by ID.
 */

const inquestIdValidation = joi.number().integer().positive().required();
router.get('/:inquestId(\\d+)', async (req, res) => {
  const query = inquestIdValidation.validate(req.params.inquestId);
  if (query.error) {
    res.sendStatus(400);
    return;
  }

  const inquest = await getCustomRepository(InquestRepository).getInquestById(query.value);
  if (!inquest) {
    res.status(404).send('Inquest not found');
    return;
  }
  res.json(inquest);
});

/**
 * Get inquests with optional search parameters and pagination.
 */

const inquestQueryValidation = joi.object<{
  offset: number;
  limit: number;
  text?: string;
  keywords?: string[];
  jurisdiction?: string;
}>({
  offset: joi.number().integer().min(0).default(0),
  limit: joi.number().integer().positive().default(PAGINATION),
  text: joi.string(),
  keywords: joi.array(),
  jurisdiction: joi.string(),
});
router.get('/', async (req, res) => {
  const query = inquestQueryValidation.validate(req.query);
  if (query.error) {
    res.sendStatus(400);
    return;
  }

  const { offset, limit, text, keywords, jurisdiction } = query.value;
  const [data, count] = await getCustomRepository(InquestRepository).getInquests({
    offset,
    limit,
    text,
    keywords,
    jurisdiction,
  });
  res.json({ data, count });
});

export default router;
