const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');

// TODO: Do we want a "View all" button to get all the recipes?

// This gets the 25 most recent recipes and orders them newest to oldest.
// Can be populated on the page when the page loads?
router.get('/recent', (req, res) => {
  db.Recipe.findAll({
    include: [db.Author],
    order: [['createdAt', 'DESC']],
    limit: 25,
  }).then((data) => {
    res.json(data);
  });
});


//  This manages the search one search filter at a time
// TODO: should I separate these three and use req.params?
router.get('/search', (req, res) => {
  if (req.body.category) {
    db.Recipe.findAll({
      include: [db.Author],
      where: { category: req.body.category },
    }).then(
      (data) => {
        res.json(data);
      },
    );
  } else if (req.body.ingredient_name) {
    db.Recipe.findAll({
      include: [db.Author,
        {
          model: db.Ingredient,
          where: {
            ingredient_name: {
              [Op.like]: `%${req.body.ingredient_name}%`,
            },
          },
        },
      ],
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  } else if (req.body.name) {
    db.Recipe.findAll({
      include: [
        {
          model: db.Author,
          where: {
            name: {
              [Op.like]: `%${req.body.name}%`,
            },
          },
        },
      ],
    }).then((data) => {
      res.json(data);
    });
  }
});

// TODO:  Make it able to handle multiple queries at once.
// The below code works for that, but only if the user specifies all three search parameters.
// Have Bryan make to separate search forms, one for single searches, and one for all three?
// We can play around with if statments to get it to work.
// ***
router.get('/:ingredient/:author/:category', (req, res) => {
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
        where: { name: req.params.author },
      },
    ],
    where: {
      category: req.params.category,
    },
  }).then((data) => {
    res.json(data);
  });
});

// **** PUT to update the favorite_count
router.put('/:id', (req, res) => {
  db.Recipe.update(
    {
      favorite_count: req.body.favorite_count,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  ).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

module.exports = router;
