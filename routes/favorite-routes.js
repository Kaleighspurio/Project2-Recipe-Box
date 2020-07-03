const router = require('express').Router();
const db = require('../models');
// Favorites html will just have a GET

router.get('/', (req, res) => {
  db.Recipe.findAll({
    order: [['favorite_count', 'DESC']],
    limit: 10,
    include: [db.Author],
  }).then((dbSort) => {
    res.json(dbSort);
  });
});

module.exports = router;
