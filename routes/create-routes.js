const router = require('express').Router();
const db = require('../models');

router.post('/', (req, res) => {
  let authorID;
  //   Check if an author already exists with the name the user put in.
  // eslint-disable-next-line no-unused-vars
  const checkAuthor = new Promise((resolve, reject) => {
    db.Author.findOne({ where: { name: req.body.name } }).then((dbAuthor) => {
      console.log(dbAuthor);
      //   if the author already exists, set the authorID to that author's database id
      if (dbAuthor !== null) {
        console.log(dbAuthor.dataValues.id);
        authorID = dbAuthor.dataValues.id;
        console.log(authorID, 'This is the authorID for existing author');
        resolve(authorID);
        //  if that author does not exist, then create the new author in the author table and
        // set the authorID variable to the new author's ID
      } else {
        // eslint-disable-next-line no-shadow
        db.Author.create({ name: req.body.name }).then((dbAuthor) => {
          authorID = dbAuthor.dataValues.id;
          console.log(authorID, 'This should be the id for a new author');
          resolve(authorID);
        });
      }
    });
  });

  // This handles the creating of the recipe in the Recipe table and the
  //   ingredients in the Ingredient table
  const postRecipe = async () => {
    const recipeCreate = await db.Recipe.create({
      AuthorId: authorID,
      recipe_name: req.body.recipe_name,
      instructions: req.body.instructions,
      serving_size: req.body.serving_size,
      category: req.body.category,
      dietary_restriction: req.body.dietary_restriction,
      image: req.body.image,
      url_source: req.body.url_source,
    }).then((dbRecipe) => dbRecipe);
    // eslint-disable-next-line no-unused-vars
    const ingredientCreate = await req.body.ingredient_name.forEach(
      (ingredient) => {
        db.Ingredient.create({
          RecipeId: recipeCreate.id,
          ingredient_name: ingredient,
        });
      },
    );
  };
  //   Call the functions: checkAuthor, then run the post recipe function
  checkAuthor
    .then(() => {
      postRecipe();
    })
    .then((recipeCreate) => {
      res.json(recipeCreate);
    });
});

module.exports = router;
