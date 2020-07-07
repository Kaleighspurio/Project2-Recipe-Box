const router = require('express').Router();
const db = require('../models');

router.post('/', async (req, res) => {
  let authorID;
  //   Check if an author already exists with the name the user put in.
  // eslint-disable-next-line no-unused-vars
  let dbAuthor = await db.Author.findOne({ where: { name: req.body.name } });
  console.log(dbAuthor);
  //   if the author already exists, set the authorID to that author's database id
  if (dbAuthor !== null) {
    console.log(dbAuthor.dataValues.id);
    authorID = dbAuthor.dataValues.id;
    console.log(authorID, 'This is the authorID for existing author');
    //  if that author does not exist, then create the new author in the author table and
    // set the authorID variable to the new author's ID
  } else {
    // eslint-disable-next-line no-shadow
    dbAuthor = await db.Author.create({ name: req.body.name });
    authorID = dbAuthor.dataValues.id;
    console.log(authorID, 'This should be the id for a new author');
  }
console.log(req.files);
  let filepath;
  //   *** this will handle the image:
  if (req.files) {
    const saveAndMoveImg = () => {
      console.log(req.body.image[0].files[0].name);
      // eslint-disable-next-line prefer-destructuring
      const file = req.body.image[0].files[0];
      const filename = file.name;
      console.log(filename);

      file.mv(`../uploads/${filename}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      filepath = `../uploads/${filename}`;
    };
    await saveAndMoveImg();
  }

  // This handles the creating of the recipe in the Recipe table and the
  //   ingredients in the Ingredient table
  const recipeCreate = await db.Recipe.create({
    AuthorId: authorID,
    recipe_name: req.body.recipe_name,
    instructions: req.body.instructions,
    serving_size: req.body.serving_size,
    category: req.body.category,
    dietary_restriction: req.body.dietary_restriction,
    image: filepath,
    url_source: req.body.url_source,
  });
  // eslint-disable-next-line no-unused-vars
  await req.body.ingredient_name.forEach((ingredient) => {
    db.Ingredient.create({
      RecipeId: recipeCreate.id,
      ingredient_name: ingredient,
    });
  });

  console.log(recipeCreate, 'a;sdljfa;sldkjfa;lskdjf');
  res.json(recipeCreate.dataValues);
  //   Call the functions: checkAuthor, then run the post recipe function
});

module.exports = router;
