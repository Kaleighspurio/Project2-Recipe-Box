const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/create.html'));
});

router.get('/recipe', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view.html'));
});

router.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/favorites.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
