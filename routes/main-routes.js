const router = require('express').Router();
const db = require('../models');

// const { Op } = Sequelize;
//     The index.html '/' will only have a GET and a PUT (:id) for voting/favoriting
//     *****  GET
router.get('/', async (req, res) => {
console.log(req.body, "as;ldkfja;lskdjf");
  if (req.body.category) {
    await db.Recipe.findAll({ where: { category: req.body.category } }).then(
      (data) => {
        res.json(data);
      },
    );
  } else if (req.body.ingredient_name) {
    await db.Ingredient.findAll({
    //   include: [
        // {
        //   model: db.Ingredient,
          where: {
            ingredient_name: { [db.like]: `%${req.body.ingredient_name}%` },
          },
        // },
    //   ],
    }).then((data) => {
      res.json(data);
    });
  } else if (req.body.name) {
    await db.Recipe.findAll({
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
//     Something like this, but we will need to add some things depending on what the user searches
//     (add some 'WHERE's):
//     router.get("/", (req, res) => {
//   db.Recipe.findAll({ include: [db.Ingredient, db.Author] }).then(
//     (dbRecipe) => {
//       res.json(dbRecipe);
//     }
//   );
// });

// **** PUT
// router.put('/:id', (req, res) => {
//     db.Recipe.update({}, {})
// });

module.exports = router;
