const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');


// This gets the 25 most recent recipes and orders them newest to oldest.
// Can be populated on the page when the page loads?
// /api/recent
router.get('/recent', (req, res) => {
  db.Recipe.findAll({
    include: [db.Author],
    order: [['createdAt', 'DESC']],
    limit: 25,
  }).then((data) => {
    res.json(data);
  });
});

// to search just by category
router.get('/category/:category', (req, res) => {
  db.Recipe.findAll({
    include: [db.Author],
    where: {
      category: {
        [Op.like]: `%${req.params.category}%`,
      },
    },
  }).then((data) => {
    res.json(data);
  });
});

// to search just by dietary restriction
router.get('/restriction/:restriction', (req, res) => {
  db.Recipe.findAll({
    include: [db.Author],
    where: {
      dietary_restriction: {
        [Op.like]: `%${req.params.restriction}%`,
      },
    },
  }).then((data) => {
    res.json(data);
  });
});

// to search by ingredient
router.get('/ingredient/:ingredient', (req, res) => {
  db.Recipe.findAll({
    include: [
      db.Author,
      {
        model: db.Ingredient,
        where: {
          ingredient_name: {
            [Op.like]: `%${req.params.ingredient}%`,
          },
        },
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

// to search by author
router.get('/author/:author', (req, res) => {
  db.Recipe.findAll({
    include: [
      {
        model: db.Author,
        where: {
          name: {
            [Op.like]: `%${req.params.author}%`,
          },
        },
      },
    ],
  }).then((data) => {
    res.json(data);
  });
});

// Search for both category and ingredient
router.get('/category/:category/ingredient/:ingredient', (req, res) => {
  db.Recipe.findAll({
    include: [
      {
        model: db.Ingredient,
        where: {
          ingredient_name: {
            [Op.like]: `%${req.params.ingredient}%`,
          },
        },
      },
      {
        model: db.Author,
      },
    ],
    where: {
      category: {
        [Op.like]: `%${req.params.category}%`,
      },
    },
  }).then((data) => {
    res.json(data);
  });
});

// Search for both category and dietary restriction
router.get('/category/:category/restriction/:restriction', (req, res) => {
  db.Recipe.findAll({
    include: [
      {
        model: db.Author,
      },
    ],
    where: {
      [Op.and]: [
        {
          category: {
            [Op.like]: `%${req.params.category}%`,
          },
        },
        {
          dietary_restriction: {
            [Op.like]: `%${req.params.restriction}%`,
          },
        },
      ],
    },
  }).then((data) => {
    res.json(data);
  });
});

// **** PUT to update the favorite_count
router.put('/:id', (req, res) => {
  db.Recipe.update(
    { favorite_count: req.body.favoriteCount },
    { where: { id: req.params.id } },
  ).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

module.exports = router;
