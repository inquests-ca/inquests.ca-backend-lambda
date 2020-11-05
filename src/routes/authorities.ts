import express from 'express';
import joi from 'joi';
import createError from 'http-errors';
import { getCustomRepository } from 'typeorm';

import { AuthorityRepository } from '../dao/authority';
import { PAGINATION } from '../constants';

const router = express.Router();

/**
 * Get authority by ID.
 */

const authorityIdValidation = joi.number().integer().positive().required();
router.get('/:authorityId(\\d+)', async (req, res, next) => {
  const query = authorityIdValidation.validate(req.params.authorityId);
  if (query.error) {
    next(createError(400));
    return;
  }

  const authority = await getCustomRepository(AuthorityRepository).getAuthorityById(query.value);
  if (!authority) {
    next(createError(404, 'Authority not found'));
    return;
  }
  res.json(authority);
});

/**
 * Get authorities with optional search parameters and pagination.
 */

const authorityQueryValidation = joi.object<{
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
router.get('/', async (req, res, next) => {
  const query = authorityQueryValidation.validate(req.query);
  if (query.error) {
    next(createError(400));
    return;
  }

  const { offset, limit, text, keywords, jurisdiction } = query.value;
  const [data, count] = await getCustomRepository(AuthorityRepository).getAuthorities({
    offset,
    limit,
    text,
    keywords,
    jurisdiction,
  });
  res.json({ data, count });
});

export default router;
