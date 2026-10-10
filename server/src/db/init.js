const db = require('./knex');
const seedTemplates = require('./seedData');

/** Creates tables if missing (idempotent) and seeds templates when empty. */
async function initDb() {
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name', 80).notNullable();
      t.string('email', 160).notNullable().unique();
      t.string('password_hash').notNullable();
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
  }

  if (!(await db.schema.hasTable('templates'))) {
    await db.schema.createTable('templates', (t) => {
      t.increments('id').primary();
      t.string('name', 120).notNullable();
      t.text('description').notNullable();
      t.string('thumbnail_url', 300).notNullable();
      t.string('category', 60).notNullable();
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
  }

  if (!(await db.schema.hasTable('favorites'))) {
    await db.schema.createTable('favorites', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      t.integer('template_id').unsigned().notNullable().references('id').inTable('templates').onDelete('CASCADE');
      t.timestamp('created_at').defaultTo(db.fn.now());
      t.unique(['user_id', 'template_id']);
    });
  }

  const [{ count }] = await db('templates').count({ count: '*' });
  if (Number(count) === 0) {
    await db('templates').insert(seedTemplates);
    console.log(`Seeded ${seedTemplates.length} templates`);
  }
}

module.exports = initDb;
