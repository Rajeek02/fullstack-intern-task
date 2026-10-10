const ApiError = require('../utils/ApiError');

/** validate(zodSchema, 'body' | 'params' | 'query') */
module.exports = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'value';
      if (!errors[key]) errors[key] = issue.message;
    }
    return next(new ApiError(400, 'Validation failed', errors));
  }
  req[source] = result.data;
  next();
};
