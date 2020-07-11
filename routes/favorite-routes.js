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

router.put('/:id', (req, res) => {
  db.Recipe.update(
    { favorite_count: req.body.favoriteCount },
    { where: { id: req.params.id } },
  ).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

module.exports = router;
