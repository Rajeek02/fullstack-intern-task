const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const { buildThumbnail } = require('./utils/thumbnail');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.set('trust proxy', 1); // correct protocol/host behind Render's proxy

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } })); // allow images on other origin
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || config.clientUrls.includes(origin.replace(/\/$/, ''))) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json({ limit: '100kb' }));
if (!config.isProd) app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ success: true, name: 'Mini SaaS Template Store API', docs: '/api/health' }));
app.get('/api/health', (_req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));

app.get('/thumbnails/:slug.svg', (req, res) => {
  const svg = buildThumbnail(req.params.slug);
  if (!svg) return res.status(404).end();
  res.type('image/svg+xml').set('Cache-Control', 'public, max-age=86400').send(svg);
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/favorites', require('./routes/favorites'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
