import joi from 'joi';

/**
 * Wrapper of Joi validate method with proper typing.
 */
export const validate = <T>(schema: joi.ObjectSchema<T>, value: unknown): T | null => {
  const validation = schema.validate(value, { stripUnknown: true });
  if (validation.error || !validation.value) return null;
  else return validation.value as T;
};
