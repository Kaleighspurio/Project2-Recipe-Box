const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');

router.get('/', (req, res) => {
  if (req.body.category) {
    db.Recipe.findAll({ where: { category: req.body.category } }).then(
      (data) => {
        res.json(data);
      },
    );
  } else if (req.body.ingredient_name) {
    db.Recipe.findAll({
      include: [
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
          where: { name: req.body.name },
        },
      ],
    }).then((data) => {
      res.json(data);
    });
  }
});

// TODO:  Make it able to handle multiple queries at once.
// The below code works for that, but only if the user specifies all three search parameters.
// We can play around with if statments to get it to work.
// ***
// router.get('/', (req, res) => {
//   db.Recipe.findAll({
//     include: [
//       {
//         model: db.Ingredient,
//         where: {
//           ingredient_name: {
//             [Op.like]: `%${req.body.ingredient_name}%`,
//           },
//         },
//       },
//       {
//         model: db.Author,
//         where: { name: req.body.name },
//       },
//     ],
//     where: {
//       category: req.body.category,
//     },
//   }).then((data) => {
//     res.json(data);
//   });
// });

// **** PUT
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

// TODO: Add a search for most recently created recipes?

module.exports = router;
