const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/knex');
const config = require('../config');
const ApiError = require('../utils/ApiError');

const signToken = (user) =>
  jwt.sign({ email: user.email }, config.jwtSecret, { subject: String(user.id), expiresIn: config.jwtExpiresIn });

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await db('users').where({ email }).first();
  if (existing) throw new ApiError(409, 'An account with this email already exists', { email: 'Email already registered' });

  const password_hash = await bcrypt.hash(password, 10);
  const [inserted] = await db('users').insert({ name, email, password_hash }).returning('id');
  const id = typeof inserted === 'object' ? inserted.id : inserted;
  const user = { id, name, email };

  res.status(201).json({ success: true, message: 'Account created', token: signToken(user), user: publicUser(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db('users').where({ email }).first();
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) throw new ApiError(401, 'Invalid email or password');

  res.json({ success: true, message: 'Logged in', token: signToken(user), user: publicUser(user) });
};

exports.me = async (req, res) => {
  const user = await db('users').where({ id: req.user.id }).first();
  if (!user) throw new ApiError(401, 'User no longer exists');
  res.json({ success: true, user: publicUser(user) });
};
