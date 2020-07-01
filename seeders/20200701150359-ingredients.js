
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Ingredients', [{
    ingredient_name: '2 cups flour',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '3/4 cup Dutch-process Cocoa',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '1 tsp. baking soda',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '1/2 tsp. salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '1 cup butter, softened',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '2 cups sugar, and a little extra for coating',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '2 eggs',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '2 tsp. vanilla',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 1,
  }, {
    ingredient_name: '2 1/4 cups flour',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 1/2 cups sugar',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '3 1/2 tsp. baking powder',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 tsp. salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 1/4 cups milk',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 tablespoon vegetable oil',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1/2 cup butter, softened',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '3 eggs',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 tsp. vanilla',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 tsp. almond extract',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 2,
  }, {
    ingredient_name: '1 tbsp olive oil',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 medium yellow onion, chopped',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '4 cloves garlic, minced',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 jalapeno, seeded and chopped',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 red bell pepper',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 lb boneless, skinless chicken breasts',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '2 cups frozen corn',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '2 tsp. cumin',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 tsp. chilli powder',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1/4 tsp. cayenne pepper',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '6 cups chicken broth',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 can tomato sauce',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 can diced tomatoes',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }, {
    ingredient_name: '1 1/2 tbsp. corn meal',
    createdAt: new Date(),
    updatedAt: new Date(),
    RecipeId: 3,
  }]),


  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('People', null, {});
  //   */
  // }
};
