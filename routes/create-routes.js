const router = require('express').Router();

// **** POST for the new recipe:
//     *** Dave says use async await here...
// router.post("/recipes", (req, res) => {
//   db.Author.create({
//     name: req.body.author,
//   }).then((dbAuthor) => {
//     console.log(dbAuthor.id, "This is the author's ID?");
//     db.Recipe.create(
//       {
//         AuthorId: dbAuthor.id,
//         recipe_name: req.body.recipe_name,
//         instructions: req.body.instructions,
//         serving_size: req.body.serving_size,
//         category: req.body.category,
//         ingredient_name: req.body.ingredients,
//         special notes?
//         image?
//         url?
//       },
//       {
//         include: [
//           {
//             model: db.Author,
//             as: "Author",
//           },
//         ],
//       },
//       {
//         include: [
//           {
//             model: db.Ingredient,
//             as: "Ingredient",
//           },
//         ],
//       }
//     ).then((dbRecipe) => {
//       console.log(dbRecipe.id, "This should be the recipe ID");
//       req.body.ingredients.forEach((ingredient) => {
//           db.Ingredient.create({
//               RecipeId: dbRecipe.id,
//               ingredent_name: ingredient,
//           });
//       });
//     }).then((dbRecipe) => {
//         res.json(dbRecipe);
//     });
//   });
// });

module.exports = router;
