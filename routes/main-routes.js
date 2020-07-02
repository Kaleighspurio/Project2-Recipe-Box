const router = require('express').Router();
const db = require('../models');

// router.get('/', (req, res) => res.json('Sample API get endpoint'));


//     The index.html '/' will only have a GET and a PUT (:id) for voting/favoriting
//     *****  GET
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
