const { z } = require('zod');

const email = z
  .string({ required_error: 'Email is required' })
  .trim()
  .toLowerCase()
  .email('Enter a valid email address');

const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().min(2, 'Name must be at least 2 characters').max(80),
  email,
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters')
    .regex(/[A-Za-z]/, 'Password must contain a letter')
    .regex(/[0-9]/, 'Password must contain a number'),
});

const loginSchema = z.object({
  email,
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

const idParamSchema = z.object({
  id: z.coerce.number({ invalid_type_error: 'Id must be a number' }).int().positive('Id must be a positive integer'),
});

const templateIdParamSchema = z.object({
  templateId: z.coerce.number({ invalid_type_error: 'templateId must be a number' }).int().positive('templateId must be a positive integer'),
});

const listQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.string().trim().max(60).optional(),
});

module.exports = { registerSchema, loginSchema, idParamSchema, templateIdParamSchema, listQuerySchema };
