const router = require('express').Router();
const db = require('../models');

const Op = db.Sequelize;
// const { Op } = Sequelize;
//     The index.html '/' will only have a GET and a PUT (:id) for voting/favoriting
//     *****  GET
router.get('/', (req, res) => {
  console.log(req.body, 'as;ldkfja;lskdjf');
  if (req.body.category) {
    db.Recipe.findAll({ where: { category: req.body.category } }).then(
      (data) => {
        res.json(data);
      },
    );
    // *** This part doesn't work
  } else if (req.body.ingredient_name) {
    db.Recipe.findAll({
      include: [
        {
          model: db.Ingredient,
          where: {
            ingredient_name: {
              [Op.like]: req.body.ingredient_name,
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
    //   ***** end of the part that doesn't work
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

// TODO:  Make it able to handle multiple queries at once?  USE: [Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)

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

module.exports = router;
