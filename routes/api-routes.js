const router = require('express').Router();

router.get('/', (req, res) => res.json('Sample API get endpoint'));

/*
    The index.html '/' will only have a GET and a PUT (:id) for voting/favoriting
    *****  GET
    Something like this, but we will need to add some things depending on what the user searches
    (add some 'WHERE's):
    router.get("/", (req, res) => {
  db.Recipe.findAll({ include: [db.Ingredient, db.Author] }).then(
    (dbRecipe) => {
      res.json(dbRecipe);
    }
  );
});

**** PUT
router.put('/:id', (req, res) => {
    db.Recipe.update({}, {})
});

**** POST for the new recipe:
    *** Dave says use async await here...
router.post("/recipes", (req, res) => {
  db.Author.create({
    name: req.body.author,
  }).then((dbAuthor) => {
    console.log(dbAuthor.id, "This is the author's ID?");
    db.Recipe.create(
      {
        AuthorId: dbAuthor.id,
        recipe_name: req.body.recipe_name,
        instructions: req.body.instructions,
        serving_size: req.body.serving_size,
        category: req.body.category,
        ingredient_name: req.body.ingredients,
        special notes?
        image?
        url?
      },
      {
        include: [
          {
            model: db.Author,
            as: "Author",
          },
        ],
      },
      {
        include: [
          {
            model: db.Ingredient,
            as: "Ingredient",
          },
        ],
      }
    ).then((dbRecipe) => {
      console.log(dbRecipe.id, "This should be the recipe ID");
      req.body.ingredients.forEach((ingredient) => {
          db.Ingredient.create({
              RecipeId: dbRecipe.id,
              ingredent_name: ingredient,
          });
      });
    }).then((dbRecipe) => {
        res.json(dbRecipe);
    });
  });
});


Favorites html will just have a GET


View will have a create/POST to comment, it will also have a get to view recipe and comments,
it will also have a PUT/update to edit the special notes
*/


module.exports = router;
