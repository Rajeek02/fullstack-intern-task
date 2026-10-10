const db = require('../db/knex');
const ApiError = require('../utils/ApiError');

const absoluteUrl = (req, url) => (url && url.startsWith('/') ? `${req.protocol}://${req.get('host')}${url}` : url);

async function favoriteIdSet(userId) {
  if (!userId) return new Set();
  const rows = await db('favorites').where({ user_id: userId }).select('template_id');
  return new Set(rows.map((r) => r.template_id));
}

const shape = (req, t, favs) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  thumbnail_url: absoluteUrl(req, t.thumbnail_url),
  category: t.category,
  is_favorite: favs.has(t.id),
});
exports.shapeTemplate = shape;
exports.favoriteIdSet = favoriteIdSet;

exports.list = async (req, res) => {
  const { search, category } = req.query;
  const q = db('templates').select('*').orderBy('id', 'asc');
  if (category && category.toLowerCase() !== 'all') q.where('category', category);
  if (search) {
    const term = `%${search.toLowerCase()}%`;
    q.where((b) => b.whereRaw('LOWER(name) LIKE ?', [term]).orWhereRaw('LOWER(description) LIKE ?', [term]));
  }
  const [rows, favs] = await Promise.all([q, favoriteIdSet(req.user?.id)]);
  res.json({ success: true, count: rows.length, data: rows.map((t) => shape(req, t, favs)) });
};

exports.categories = async (_req, res) => {
  const rows = await db('templates').distinct('category').orderBy('category');
  res.json({ success: true, data: rows.map((r) => r.category) });
};

exports.getOne = async (req, res) => {
  const t = await db('templates').where({ id: req.params.id }).first();
  if (!t) throw new ApiError(404, 'Template not found');
  const favs = await favoriteIdSet(req.user?.id);
  res.json({ success: true, data: shape(req, t, favs) });
};
