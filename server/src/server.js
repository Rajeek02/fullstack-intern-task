const app = require('./app');
const config = require('./config');
const initDb = require('./db/init');

(async () => {
  try {
    await initDb();
    app.listen(config.port, () => console.log(`API running on http://localhost:${config.port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
