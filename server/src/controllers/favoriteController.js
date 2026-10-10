const db = require('../db/knex');
const ApiError = require('../utils/ApiError');
const { shapeTemplate } = require('./templateController');

exports.add = async (req, res) => {
  const { templateId } = req.params;
  const template = await db('templates').where({ id: templateId }).first();
  if (!template) throw new ApiError(404, 'Template not found');

  const existing = await db('favorites').where({ user_id: req.user.id, template_id: templateId }).first();
  if (existing) return res.status(200).json({ success: true, message: 'Already in favorites', template_id: templateId });

  await db('favorites').insert({ user_id: req.user.id, template_id: templateId });
  res.status(201).json({ success: true, message: 'Added to favorites', template_id: templateId });
};

exports.remove = async (req, res) => {
  const { templateId } = req.params;
  const deleted = await db('favorites').where({ user_id: req.user.id, template_id: templateId }).del();
  if (!deleted) throw new ApiError(404, 'This template is not in your favorites');
  res.json({ success: true, message: 'Removed from favorites', template_id: templateId });
};

exports.list = async (req, res) => {
  const rows = await db('favorites')
    .join('templates', 'templates.id', 'favorites.template_id')
    .where('favorites.user_id', req.user.id)
    .orderBy('favorites.created_at', 'desc')
    .orderBy('favorites.id', 'desc')
    .select('templates.*');
  const favs = new Set(rows.map((r) => r.id));
  res.json({ success: true, count: rows.length, data: rows.map((t) => shapeTemplate(req, t, favs)) });
};
