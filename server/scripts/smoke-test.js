// Run the server first (npm start), then: npm run test:smoke
const BASE = process.env.API_URL || 'http://localhost:5000';
let failed = 0;

async function call(method, path, body, token) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try { json = await res.json(); } catch (_) {}
  return { status: res.status, json };
}

function check(name, cond, extra = '') {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${cond ? '' : extra}`);
  if (!cond) failed++;
}

(async () => {
  const email = `test_${Date.now()}@example.com`;
  let r = await call('POST', '/api/auth/register', { name: 'T', email: 'bad', password: '123' });
  check('register validation -> 400', r.status === 400 && r.json.errors, JSON.stringify(r.json));

  r = await call('POST', '/api/auth/register', { name: 'Test User', email, password: 'Passw0rd!' });
  check('register -> 201 + token', r.status === 201 && !!r.json.token, JSON.stringify(r.json));
  const token = r.json.token;

  r = await call('POST', '/api/auth/register', { name: 'Test User', email, password: 'Passw0rd!' });
  check('duplicate register -> 409', r.status === 409);

  r = await call('POST', '/api/auth/login', { email, password: 'wrongpass1' });
  check('wrong password -> 401', r.status === 401);

  r = await call('POST', '/api/auth/login', { email, password: 'Passw0rd!' });
  check('login -> 200 + token', r.status === 200 && !!r.json.token);

  r = await call('GET', '/api/templates');
  check('list templates (>=5)', r.status === 200 && r.json.data.length >= 5, JSON.stringify(r.json).slice(0, 200));
  const firstId = r.json.data[0].id;
  check('thumbnail is absolute url', r.json.data[0].thumbnail_url.startsWith('http'));

  r = await call('GET', `/api/templates/${firstId}`);
  check('template detail -> 200', r.status === 200 && r.json.data.id === firstId);

  r = await call('GET', '/api/templates/99999');
  check('missing template -> 404', r.status === 404);

  r = await call('GET', '/api/templates/abc');
  check('bad id -> 400', r.status === 400);

  r = await call('GET', '/api/templates?category=Dashboard');
  check('filter by category', r.status === 200 && r.json.data.every((t) => t.category === 'Dashboard') && r.json.count >= 1);

  r = await call('GET', '/api/templates?search=portfolio');
  check('search works', r.status === 200 && r.json.count >= 1);

  r = await call('GET', '/api/templates/categories');
  check('categories list', r.status === 200 && r.json.data.length >= 3);

  r = await call('POST', `/api/favorites/${firstId}`);
  check('favorite without token -> 401', r.status === 401);

  r = await call('POST', `/api/favorites/${firstId}`, null, token);
  check('add favorite -> 201', r.status === 201, JSON.stringify(r.json));

  r = await call('POST', `/api/favorites/${firstId}`, null, token);
  check('add favorite again -> 200 (idempotent)', r.status === 200);

  r = await call('POST', '/api/favorites/99999', null, token);
  check('favorite missing template -> 404', r.status === 404);

  r = await call('GET', '/api/favorites', null, token);
  check('list favorites', r.status === 200 && r.json.count === 1 && r.json.data[0].id === firstId);

  r = await call('GET', '/api/templates', null, token);
  check('is_favorite flag set', r.json.data.find((t) => t.id === firstId).is_favorite === true);

  r = await call('DELETE', `/api/favorites/${firstId}`, null, token);
  check('remove favorite -> 200', r.status === 200);

  r = await call('GET', '/api/favorites', null, token);
  check('favorites empty after remove', r.json.count === 0);

  const t = await fetch(`${BASE}/thumbnails/nova-landing.svg`);
  check('thumbnail svg served', t.status === 200 && (t.headers.get('content-type') || '').includes('svg'));

  console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
