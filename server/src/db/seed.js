// Run manually with: npm run seed  (re-seeds templates from scratch)
const db = require('./knex');
const initDb = require('./init');
const seedTemplates = require('./seedData');

(async () => {
  try {
    await initDb();
    await db('favorites').del();
    await db('templates').del();
    await db('templates').insert(seedTemplates);
    console.log(`Re-seeded ${seedTemplates.length} templates`);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await db.destroy();
  }
})();
