import express from 'express';
import joi from 'joi';
import createError from 'http-errors';
import { getCustomRepository } from 'typeorm';

import { AuthorityRepository } from '../dao/authority';
import { authorityQuerySchema } from '../utils/query';

const router = express.Router();

/**
 * Get authority by ID.
 */

router.get('/:authorityId(\\d+)', async (req, res, next) => {
  const authorityIdSchema = joi.number().integer().positive().required();
  const query = authorityIdSchema.validate(req.params.authorityId);
  if (query.error) {
    next(createError(400));
    return;
  }

  const authority = await getCustomRepository(AuthorityRepository).getAuthorityFromId(query.value);
  if (!authority) {
    next(createError(404, 'Authority not found'));
    return;
  }
  res.json(authority);
});

/**
 * Get authorities with optional search parameters and pagination.
 */

router.get('/', async (req, res, next) => {
  const query = authorityQuerySchema.validate(req.query, { stripUnknown: true });
  if (query.error) {
    next(createError(400));
    return;
  }

  const [data, count] = await getCustomRepository(AuthorityRepository).getAuthorities(query.value);
  res.json({ data, count });
});

export default router;
