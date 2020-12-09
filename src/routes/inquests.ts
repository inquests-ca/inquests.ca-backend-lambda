import express from 'express';
import joi from 'joi';
import createError from 'http-errors';
import { getCustomRepository } from 'typeorm';

import { InquestRepository } from '../dao/inquest';
import { Sort, PAGINATION } from '../constants';

const router = express.Router();

/**
 * Get inquest by ID.
 */

const inquestIdValidation = joi.number().integer().positive().required();
router.get('/:inquestId(\\d+)', async (req, res, next) => {
  const query = inquestIdValidation.validate(req.params.inquestId);
  if (query.error) {
    next(createError(400));
    return;
  }

  const inquest = await getCustomRepository(InquestRepository).getInquestFromId(query.value);
  if (!inquest) {
    next(createError(404, 'Inquest not found'));
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
  sort?: Sort;
}>({
  offset: joi.number().integer().min(0).default(0),
  limit: joi.number().integer().positive().default(PAGINATION),
  text: joi.string(),
  keywords: joi.array(),
  jurisdiction: joi.string(),
  sort: joi.string().valid(...Object.values(Sort)),
});
router.get('/', async (req, res, next) => {
  const query = inquestQueryValidation.validate(req.query);
  if (query.error) {
    next(createError(400));
    return;
  }

  const { offset, limit, text, keywords, jurisdiction, sort } = query.value;
  const [data, count] = await getCustomRepository(InquestRepository).getInquests({
    offset,
    limit,
    text,
    keywords,
    jurisdiction,
    sort,
  });
  res.json({ data, count });
});

export default router;
