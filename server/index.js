import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from './fakeData/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.put('/api/places/:id', async function (req, res) {
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
