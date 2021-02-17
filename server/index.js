import express from 'express';
import session from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from './fakeData/db.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);

// Register User
app.post('/auth/register', async function (req, res) {
  const { username, password } = req.body;
  const users = await db.getUsers();

  // Register if unique username
  const found = users.find(user => user.username === username);
  if (found) {
    res.json(null);
  } else {
    const hash = await bcrypt.hash(password, 12);
    const userId = await db.createUser(username, hash);
    req.session.userId = userId;
    res.json(userId);
  }
});

// Login
app.post('/auth/login', async function (req, res) {
  const { username, password } = req.body;
  const users = await db.getUsers();
  const user = users.find(user => user.username === username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      res.json(user.id);
    } else {
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

// Get session
app.get('/auth/session', function (req, res) {
  res.json(req.session.userId);
});

// Logout
app.post('/auth/logout', function (req, res) {
  req.session.userId = null;
  res.sendStatus(200);
});

// Get user
app.get('/auth/users/:userId', async function (req, res) {
  const { userId } = req.params;
  const user = await db.getUser(userId);
  res.json(user);
});

// Update user password
app.put('/auth/users/:userId', async function (req, res) {
  const { id, oldPass, newPass } = req.body;
  const user = await db.getUser(id);
  const match = await bcrypt.compare(oldPass, user.password);
  if (match) {
    const hash = await bcrypt.hash(newPass, 12);
    await db.updateUser(id, hash);
    res.json(user.id);
  } else {
    res.json(null);
  }
});

// Add place to list
app.post('/api/lists/:listId/places/:placeId', async function (req, res) {
  const { listId, placeId } = req.params;
  const list = await db.addPlaceToList(listId, placeId);
  res.json(list);
});

// Remove place from list
app.delete('/api/lists/:listId/places/:placeId', async function (req, res) {
  const { listId, placeId } = req.params;
  const list = await db.removePlaceFromList(listId, placeId);
  res.json(list);
});

// Get place
app.get('/api/places/:placeId', async function (req, res) {
  const { placeId } = req.params;
  const place = await db.getPlace(placeId);
  res.json(place);
});

// Update place
app.put('/api/places/:placeId', async function (req, res) {
  const { placeId, name, rating, description, location, list } = req.body;
  await db.updatePlace(placeId, name, rating, description, location, list);
  res.sendStatus(200);
});

// Delete place
app.delete('/api/places/:placeId', async function (req, res) {
  const { placeId } = req.params;
  await db.deletePlace(placeId);
  res.sendStatus(200);
});

// Get list
app.get('/api/lists/:listId', async function (req, res) {
  const { listId } = req.params;
  const list = await db.getList(listId);
  res.json(list);
});

// Update list
app.put('/api/lists/:listId', async function (req, res) {
  const { listId, name, description } = req.body;
  await db.updateList(listId, name, description);
  res.sendStatus(200);
});

// Delete list
app.delete('/api/lists/:listId', async function (req, res) {
  const { listId } = req.params;
  await db.deleteList(listId);
  res.sendStatus(200);
});

// Create list
app.post('/api/lists', async function (req, res) {
  const { name, description } = req.body;
  const listId = await db.createList(name, description);
  res.json(listId);
});

// Get all lists
app.get('/api/lists', async function (req, res) {
  const lists = await db.getLists();
  res.json(lists);
});

// Create place
app.post('/api/places', async function (req, res) {
  const { name, rating, description, location, list } = req.body;
  const placeId = await db.createPlace(
    name,
    rating,
    description,
    location,
    list
  );
  res.json(placeId);
});

// Catch all requests and return index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
