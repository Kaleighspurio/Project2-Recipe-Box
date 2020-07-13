const router = require('express').Router();
const path = require('path');
const db = require('../models');

router.post('/', async (req, res) => {
  let authorID;
  //   Check if an author already exists with the name the user put in.
  // eslint-disable-next-line no-unused-vars
  let dbAuthor = await db.Author.findOne({ where: { name: req.body.name } });
  //   if the author already exists, set the authorID to that author's database id
  if (dbAuthor !== null) {
    authorID = dbAuthor.dataValues.id;
    //  if that author does not exist, then create the new author in the author table and
    // set the authorID variable to the new author's ID
  } else {
    // eslint-disable-next-line no-shadow
    dbAuthor = await db.Author.create({ name: req.body.name });
    authorID = dbAuthor.dataValues.id;
  }
  //   *** this will handle the image:
  let dbPath;
  if (req.files) {
    const saveAndMoveImg = () => {
      const file = req.files.image;
      const filename = file.name;
      //   save the relative file path in the database
      dbPath = `/assets/images/uploads/${filename}`;
      const filepath = path.join(__dirname, '..', 'public', 'assets', 'images', 'uploads', filename);
      //   move the image to the uploads folder
      file.mv(filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    };
    await saveAndMoveImg();
  }

  const ingredientArray = req.body.ingredient_name.split(',');
  // This handles the creating of the recipe in the Recipe table and the
  //   ingredients in the Ingredient table
  const recipeCreate = await db.Recipe.create({
    AuthorId: authorID,
    recipe_name: req.body.recipe_name,
    instructions: req.body.instructions,
    serving_size: req.body.serving_size,
    category: req.body.category,
    dietary_restriction: req.body.dietary_restriction,
    special_notes: req.body.special_notes,
    // save the relative file path
    image: dbPath,
    url_source: req.body.url_source,
  });

  await ingredientArray.forEach((ingredient) => {
    db.Ingredient.create({
      RecipeId: recipeCreate.id,
      ingredient_name: ingredient,
    });
  });

  res.json(recipeCreate.dataValues);
  //   Call the functions: checkAuthor, then run the post recipe function
});

module.exports = router;
